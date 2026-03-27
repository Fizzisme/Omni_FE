'use server'
import {cookies} from "next/headers";
import {BE_URL} from "@/lib/constants";

export const getRevenue = async (month: number) => {
   try{
       const cookieStore = await cookies();
       const accessToken = cookieStore.get("access_token_admin")?.value;
       if (!accessToken) {
           return {
               success: false,
               error: "No access token",
           };
       }
       const res = await fetch(`${BE_URL}/v1/admins/orders/revenue?month=${month}&year=2026`, {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${accessToken}`,
           },
           cache: "no-store",
       });
       const data = await res.json();

       if (!res.ok) {
           return {
               success: false,
               error: data.message || "Update failed",
           };
       }
       return data;

   }
   catch (err) {
       console.error("❌ ERROR:", err);
       return {
           success: false,
           error: "Cannot connect to server",
       };
   }
}