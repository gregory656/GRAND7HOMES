import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import moment from "moment";
import cors from 'cors'   // or: const cors = require('cors')



dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173',   // use YOUR frontend port from Step 1
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.use(express.json({ limit: "10kb" }));

const MPESA_BASE_URL = "https://sandbox.safaricom.co.ke";
const PORT = process.env.PORT || 5000;

function hasMpesaConfiguration() {
    return Boolean(
        process.env.MPESA_CONSUMER_KEY &&
        process.env.MPESA_CONSUMER_SECRET &&
        process.env.MPESA_SHORTCODE &&
        process.env.MPESA_PASSKEY &&
        process.env.CALLBACK_URL
    );
}

async function getAccessToken() {
    const auth = Buffer.from(
        `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await axios.get(
        `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
        {
            headers: { Authorization: `Basic ${auth}` },
            timeout: 15000,
        }
    );

    if (typeof response.data?.access_token !== "string") {
        throw new Error("M-Pesa authentication did not return an access token");
    }

    return response.data.access_token;
}

function generateTimestamp() {
    return moment().format("YYYYMMDDHHmmss");
}

function generatePassword(timestamp) {
    return Buffer.from(
        `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");
}

function normalizeKenyanPhone(phone) {
    if (typeof phone !== "string") return null;

    const digits = phone.replace(/[\s()+-]/g, "");
    if (/^0[17]\d{8}$/.test(digits)) return `254${digits.slice(1)}`;
    if (/^254[17]\d{8}$/.test(digits)) return digits;
    if (/^[17]\d{8}$/.test(digits)) return `254${digits}`;
    return null;
}

app.post("/api/mpesa/stkpush", async (req, res) => {
    const phone = normalizeKenyanPhone(req.body?.phone);
    const amount = Number(req.body?.amount);

    if (!phone) {
        return res.status(400).json({ message: "Enter a valid Kenyan M-Pesa phone number." });
    }

    if (
        (typeof req.body?.amount !== "number" && typeof req.body?.amount !== "string") ||
        !Number.isSafeInteger(amount) ||
        amount < 1
    ) {
        return res.status(400).json({ message: "Amount must be a positive whole number." });
    }

    if (!hasMpesaConfiguration()) {
        console.error("M-Pesa configuration is incomplete.");
        return res.status(500).json({ message: "M-Pesa is not configured." });
    }

    try {
        const token = await getAccessToken();
        const timestamp = generateTimestamp();
        const shortcode = process.env.MPESA_SHORTCODE;

        const response = await axios.post(
            `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
            {
                BusinessShortCode: shortcode,
                Password: generatePassword(timestamp),
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: phone,
                PartyB: shortcode,
                PhoneNumber: phone,
                CallBackURL: process.env.CALLBACK_URL,
                AccountReference: "GRAND7HOMES",
                TransactionDesc: "House payment",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                timeout: 20000,
            }
        );

        // Safaricom accepting the prompt means it is pending, not that it is paid.
        return res.status(202).json({
            message: "Payment request sent. Complete it on your phone; payment is still pending.",
            ResponseCode: response.data?.ResponseCode,
            MerchantRequestID: response.data?.MerchantRequestID,
            CheckoutRequestID: response.data?.CheckoutRequestID,
            CustomerMessage: response.data?.CustomerMessage,
        });
    } catch {
        console.error("M-Pesa STK Push request failed.");
        return res.status(502).json({ message: "Could not start the M-Pesa payment request." });
    }
});

app.post("/api/mpesa/callback", (req, res) => {
    const callback = req.body?.Body?.stkCallback;
    const isValidCallback =
        callback &&
        typeof callback === "object" &&
        typeof callback.MerchantRequestID === "string" &&
        typeof callback.CheckoutRequestID === "string" &&
        Number.isInteger(callback.ResultCode) &&
        typeof callback.ResultDesc === "string";

    if (!isValidCallback) {
        return res.status(400).json({ message: "Invalid M-Pesa callback." });
    }

    // Record only that a structurally valid callback arrived. Payment state should
    // be updated only after the callback result is checked against the pending order.
    console.info("Valid M-Pesa callback received.");

    // Safaricom expects an acknowledgement for valid callbacks, including failures.
    return res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" });
});

app.listen(PORT, () => {
    console.log(`GRAND7HOMES backend listening on port ${PORT}.`);
});
