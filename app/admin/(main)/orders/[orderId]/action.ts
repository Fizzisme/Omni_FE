'use server';

import { cookies } from "next/headers";
import {revalidatePath} from "next/cache";
import {BE_URL} from "@/lib/constants";

export async function updateOrderStatus(id: string, status: string) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("access_token_admin")?.value;


        if (!accessToken) {
            return {
                success: false,
                error: "No access token",
            };
        }

        const res = await fetch(`${BE_URL}/v1/admins/orders/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ status }),
            cache: "no-store",
        });


        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: data.message || "Update failed",
            };
        }
        revalidatePath(`/admin/orders/${id}`);
        return { success: true };
    } catch (err) {
        console.error("❌ ERROR:", err);
        return {
            success: false,
            error: "Cannot connect to server",
        };
    }
}