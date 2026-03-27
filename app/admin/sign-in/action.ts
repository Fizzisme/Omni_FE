'use server'
import {cookies} from "next/headers";

export async function signInAdminAction(email: string, password: string) {
    try {
        const res = await fetch("http://localhost:8017/v1/auth/admins/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email,password }),
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: data.message || "Sign in failed",
            };
        }

        // set accessToken va refreshToken BE trả về
        const { accessToken, refreshToken } = data.data;
        const cookieStore = await cookies();

        cookieStore.set({
            name: "access_token_admin",
            value: accessToken,
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
        });

        cookieStore.set({
            name: "refresh_token_admin",
            value: refreshToken,
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });

        return { success: true };
    }
    catch {
        return {
            success: false,
            error: "Cannot connect to server",
        }
    }
}