'use server'
import { cookies } from "next/headers";
import {BE_URL} from "@/lib/constants";

export async function sendVerifyCodeAction(email: string) {
    try {
        const res = await fetch(`${BE_URL}/v1/auth/send-verify-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: data.message || "Something went wrong",
            };
        }

        const setCookie = res.headers.get("set-cookie");

        if (setCookie) {
            const cookieStore = await cookies();
            const match = setCookie.match(/otp_token=([^;]+)/);
            if (match) {
                cookieStore.set({
                    name: "otp_token",
                    value: match[1],
                    httpOnly: true,
                    path: "/",
                    sameSite: "lax",
                    maxAge: 5 * 60,
                });
            }
        }

        return { success: true };
    } catch {
        return {
            success: false,
            error: "Cannot connect to server",
        };
    }
}


export async function verifyCodeAction(code: string) {
    try {
        const cookieStore = await cookies();
        const otpToken = cookieStore.get("otp_token")?.value;

        if (!otpToken) {
            return {
                success: false,
                error: "OTP token not found. Please request a new code.",
            };
        }


        const res = await fetch(`${BE_URL}/v1/auth/verify-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `otp_token=${otpToken}`, // forward cookie sang BE
            },
            body: JSON.stringify({ code }),
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: data.message || "Invalid verification code",
            };
        }

        return { success: true };
    } catch {
        return {
            success: false,
            error: "Cannot connect to server",
        };
    }
}

export async function signUpAction(email: string,password: string) {
    try {
        const res = await fetch(`${BE_URL}/v1/auth/sign-up`, {
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
                error: data.message || "Sign up failed",
            };
        }


        return { success: true };
    } catch {
        return {
            success: false,
            error: "Cannot connect to server",
        };
    }
}

