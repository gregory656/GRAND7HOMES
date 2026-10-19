/**
 * Settings.jsx - User account settings page
 */

import { useState } from 'react'
import { Bell, Shield, CreditCard, AlertTriangle } from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'

function ToggleSwitch({ enabled, onChange, label }) {
    return (
        <div className="flex items-center justify-between py-2.5">
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            <button
                onClick={() => onChange(!enabled)}
                className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${enabled ? 'left-5' : 'left-0.5'}`} />
            </button>
        </div>
    )
}

function Settings() {
    const [notifs, setNotifs] = useState({ email: true, sms: false, push: true, deals: true, reminders: true, reviews: false })
    const [privacy, setPrivacy] = useState({ profileVisible: true, shareData: false })
    const [twoFactor, setTwoFactor] = useState(false)

    const toggle = (key, state, setter) => setter({ ...state, [key]: !state[key] })

    return (
        <UserLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your preferences and account security</p>
            </div>

            <div className="space-y-5">
                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4 text-blue-500" />Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-gray-100 dark:divide-gray-700">
                        <ToggleSwitch label="Email notifications" enabled={notifs.email} onChange={(v) => setNotifs({ ...notifs, email: v })} />
                        <ToggleSwitch label="SMS notifications" enabled={notifs.sms} onChange={(v) => setNotifs({ ...notifs, sms: v })} />
                        <ToggleSwitch label="Push notifications" enabled={notifs.push} onChange={(v) => setNotifs({ ...notifs, push: v })} />
                        <ToggleSwitch label="Deals & promotions" enabled={notifs.deals} onChange={(v) => setNotifs({ ...notifs, deals: v })} />
                        <ToggleSwitch label="Booking reminders" enabled={notifs.reminders} onChange={(v) => setNotifs({ ...notifs, reminders: v })} />
                        <ToggleSwitch label="Review requests" enabled={notifs.reviews} onChange={(v) => setNotifs({ ...notifs, reviews: v })} />
                    </CardContent>
                </Card>

                {/* Privacy */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4 text-green-500" />Privacy & Security</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 divide-y divide-gray-100 dark:divide-gray-700">
                        <ToggleSwitch label="Public profile visible to others" enabled={privacy.profileVisible} onChange={(v) => setPrivacy({ ...privacy, profileVisible: v })} />
                        <ToggleSwitch label="Share data for better recommendations" enabled={privacy.shareData} onChange={(v) => setPrivacy({ ...privacy, shareData: v })} />
                        <ToggleSwitch label="Two-factor authentication (2FA)" enabled={twoFactor} onChange={setTwoFactor} />
                    </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><CreditCard className="h-4 w-4 text-purple-500" />Payment Methods</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 p-3 mb-3">
                            <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">VISA</div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/27</p>
                            </div>
                            <button className="ml-auto text-xs text-red-500 hover:underline">Remove</button>
                        </div>
                        <Button variant="outline" size="sm"><CreditCard className="h-4 w-4" />Add Payment Method</Button>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200 dark:border-red-900">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2 text-red-600 dark:text-red-400"><AlertTriangle className="h-4 w-4" />Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400">These actions are irreversible. Please be careful.</p>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400">Deactivate Account</Button>
                            <Button variant="destructive">Delete Account</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </UserLayout>
    )
}

export default Settings
