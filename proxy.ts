// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import {BE_URL} from "@/lib/constants";

export async function proxy(request: NextRequest) {
    const token = request.cookies.get("access_token_admin")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }

    const res = await fetch(`${BE_URL}/v1/admins/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const response = NextResponse.redirect(new URL("/admin/sign-in", request.url));
        response.cookies.delete("access_token_admin");
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/dash-board/:path*"],
};