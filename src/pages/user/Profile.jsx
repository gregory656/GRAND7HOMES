/**
 * Profile.jsx - User profile editing page
 * This uses Zod for form validation and React Hook Form
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, Camera } from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../contexts/AuthContext'

// This uses Zod for form validation and React Hook Form
const profileSchema = z.object({
    firstName: z.string().min(2, 'First name required'),
    lastName: z.string().min(2, 'Last name required'),
    phone: z.string().optional(),
    nationality: z.string().optional(),
    language: z.string().optional(),
    currency: z.string().optional(),
})

const passwordSchema = z.object({
    currentPassword: z.string().min(6, 'Required'),
    newPassword: z.string().min(8, 'Min 8 characters'),
    confirmNew: z.string(),
}).refine((d) => d.newPassword === d.confirmNew, { message: "Passwords don't match", path: ['confirmNew'] })

function Profile() {
    const { user, updateUser } = useAuth()
    const nameParts = (user?.name || '').split(' ')

    const profileForm = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: { firstName: nameParts[0] || '', lastName: nameParts.slice(1).join(' ') || '', phone: '', nationality: 'Kenyan', language: 'English', currency: 'KES' },
    })
    const passwordForm = useForm({ resolver: zodResolver(passwordSchema) })

    const onProfileSave = (data) => {
        updateUser({ name: `${data.firstName} ${data.lastName}` })
        alert('Profile updated!')
    }

    const onPasswordSave = (data) => {
        alert('Password updated successfully!')
        passwordForm.reset()
    }

    return (
        <UserLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your personal information and preferences</p>
            </div>

            {/* Avatar */}
            <Card className="mb-5">
                <CardContent className="py-5">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-white">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700">
                                <Camera className="h-3.5 w-3.5" />
                            </button>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white text-lg">{user?.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Member since 2024</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Info */}
            <Card className="mb-5">
                <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
                <CardContent className="pt-0">
                    <form onSubmit={profileForm.handleSubmit(onProfileSave)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="First Name" error={profileForm.formState.errors.firstName?.message} {...profileForm.register('firstName')} />
                            <Input label="Last Name" error={profileForm.formState.errors.lastName?.message} {...profileForm.register('lastName')} />
                        </div>
                        <Input label="Email" defaultValue={user?.email} disabled className="opacity-60" />
                        <Input label="Phone Number" placeholder="+254 700 000 000" {...profileForm.register('phone')} />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nationality</label>
                                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none" {...profileForm.register('nationality')}>
                                    {['Kenyan', 'Ugandan', 'Tanzanian', 'British', 'American', 'German', 'Other'].map((n) => (
                                        <option key={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
                                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none" {...profileForm.register('language')}>
                                    {['English', 'Swahili', 'French', 'German', 'Spanish'].map((l) => <option key={l}>{l}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Currency</label>
                                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none" {...profileForm.register('currency')}>
                                    {['KES', 'USD', 'EUR', 'GBP'].map((c) => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <Button type="submit" variant="gradient"><Save className="h-4 w-4" />Save Changes</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
                <CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
                <CardContent className="pt-0">
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSave)} className="space-y-4">
                        <Input label="Current Password" type="password" placeholder="••••••••" error={passwordForm.formState.errors.currentPassword?.message} {...passwordForm.register('currentPassword')} />
                        <Input label="New Password" type="password" placeholder="Min 8 characters" error={passwordForm.formState.errors.newPassword?.message} {...passwordForm.register('newPassword')} />
                        <Input label="Confirm New Password" type="password" placeholder="Re-enter new password" error={passwordForm.formState.errors.confirmNew?.message} {...passwordForm.register('confirmNew')} />
                        <Button type="submit" variant="outline">Update Password</Button>
                    </form>
                </CardContent>
            </Card>
        </UserLayout>
    )
}

export default Profile
