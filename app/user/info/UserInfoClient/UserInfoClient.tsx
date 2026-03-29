'use client';

import { useState } from 'react';
import {updateMe} from "@/app/user/action";
import {useRouter} from "next/navigation";

export default function UserInfoClient({ initialUser }: any) {
    const [user, setUser] = useState(initialUser);
    const [editing, setEditing] = useState(false);

    const router = useRouter();

    const handleUpdate = async () => {
        const res = await updateMe(user);

        if (!res.success) {
            alert(res.error);
            return;
        }

        setEditing(false);
        router.refresh();
    };

    return (

        <div className="flex justify-center items-start min-h-screen bg-[#fdf6f2] p-6">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden">

                {/* Header gradient */}
                <div className="h-24 bg-gradient-to-r from-[#ff8a50] to-[#ffb199]" />

                {/* Profile */}
                <div className="p-6 -mt-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img
                                src={user.avatar || 'https://i.pravatar.cc/100'}
                                className="w-20 h-20 rounded-full border-4 border-white shadow"
                            />
                            <div>
                                <h2 className="text-lg font-bold text-[#3e2c23]">
                                    {user.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setEditing(!editing)}
                            className="bg-[#e45001] text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                        >
                            {editing ? 'Cancel' : 'Edit'}
                        </button>
                    </div>

                    {/* Form */}
                    <div className="grid grid-cols-2 gap-4 mt-6">

                        <InputField
                            label="First Name"
                            value={user.firstName || ''}
                            disabled={!editing}
                            onChange={(v: string) => setUser({ ...user, firstName: v })}
                        />

                        <InputField
                            label="Last Name"
                            value={user.lastName || ''}
                            disabled={!editing}
                            onChange={(v: string) => setUser({ ...user, lastName: v })}
                        />

                        <InputField
                            label="Age"
                            value={user.age || ''}
                            disabled={!editing}
                            onChange={(v: number) => setUser({ ...user, age: v })}
                        />

                        <InputField
                            label="Address"
                            value={user.address || ''}
                            disabled={!editing}
                            onChange={(v: string) => setUser({ ...user, address: v })}
                        />

                        <InputField
                            label="Phone Number"
                            value={user.phoneNumber || ''}
                            disabled={!editing}
                            onChange={(v: number) => setUser({ ...user, phoneNumber: v })}
                        />

                        <SelectField
                            label="Gender"
                            value={user.gender}
                            disabled={!editing}
                            onChange={(v: string) => setUser({ ...user, gender: v })}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' },
                            ]}
                        />

                    </div>

                    {/* Email section */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-[#3e2c23] mb-2">
                            My Email Address
                        </h3>

                        <div className="flex items-center justify-between bg-[#fff3ed] p-3 rounded-lg">
                            <span className="text-sm text-gray-700">
                                {user.email}
                            </span>
                            <span className="text-xs text-gray-400">
                                Primary
                            </span>
                        </div>
                    </div>

                    {/* Created At */}
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-[#3e2c23] mb-2">
                            Account Created
                        </h3>

                        <div className="flex items-center justify-between bg-[#fff3ed] p-3 rounded-lg">
        <span className="text-sm text-gray-700">
            {new Date(user.createdAt).toLocaleString()}
        </span>
                            <span className="text-xs text-gray-400">
            Read only
        </span>
                        </div>
                    </div>

                    {/* Save button */}
                    {editing && (
                        <div className="mt-6 text-right">
                            <button
                                onClick={handleUpdate}
                                className="bg-[#e45001] text-white px-6 py-2 rounded-lg cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}


function InputField({
                        label,
                        value,
                        onChange,
                        disabled,
                    }: any) {
    return (
        <div>
            <label className="text-xs text-gray-500">{label}</label>
            <input
                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff8a50]"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

function SelectField({
                         label,
                         value,
                         onChange,
                         disabled,
                         options,
                     }: any) {
    return (
        <div>
            <label className="text-xs text-gray-500">{label}</label>
            <select
                className={`w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff8a50] ${
                    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'
                }`}
                value={value || ''}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select {label}</option>
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}