'use server';

import { cookies } from 'next/headers';
import { BE_URL } from '@/lib/constants';

export const updateMe = async (userData: any) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
        return {
            success: false,
            error: "No token",
        };
    }

    const res = await fetch(`${BE_URL}/v1/users`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
        return {
            success: false,
            error: data.message || "Update failed",
        };
    }

    return {
        success: true,
        data,
    };
};