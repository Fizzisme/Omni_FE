
import { Heart, ShoppingBag, User } from 'lucide-react';
import { ChevronRight } from '@/components/animate-ui/icons/chevron-right';
import { ChevronLeft } from '@/components/animate-ui/icons/chevron-left';
import Image from 'next/image';
import Link from 'next/link';
import {BE_URL} from "@/lib/constants";
import Nav from "@/components/Nav/Nav";
import {cookies} from "next/headers";

interface ICategories{
    _id: string;
    name: string;
    slug: string;
}

export const getMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
        return {
            success: false,
            error: "No access token",
        };
    }

    const res = await fetch(`${BE_URL}/v1/users/me`, {
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


export default async function Header({categories}:{categories: ICategories[]}) {

    let isLoggedIn = false;
    const user = await getMe()
    if(user?.data?._id)  {
        isLoggedIn = true;
    }

    return (
        <header className="bg-white border-b border-[#f0e8e1] px-4 pt-4">
            {/* Announcement Bar */}
            <div className="bg-[#ffd0b8] text-[#573727] text-sm font-semibold tracking-widest text-center px-4 py-2 flex justify-between items-center">
                <ChevronLeft animateOnHover color={'#573727'} />
                FREE SHIPPING FOR ORDERS FROM $300
                <ChevronRight animateOnHover color={'#573727'} />
            </div>
            <div className="px-8 flex items-center justify-between">
                {/* Socials */}
                <div className="flex items-center gap-3">
                    <a href="#" className="text-[#3e2c23]">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                    <a href="#" className="text-[#3e2c23]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                    </a>
                </div>

                {/* Logo */}
                <Image src="/logo.png" alt={'Logo'} height={120} width={120} priority  />

                {/* Icons */}
                <div className="flex items-center gap-4 text-[#927d73]">
                    {/* Search */}
                    <button className="cursor-pointer">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    {/* Wishlist */}
                    <button className="cursor-pointer">
                        <Heart />
                    </button>

                    {/* Cart */}
                    <Link href="/cart" className="cursor-pointer">
                        <ShoppingBag />
                    </Link>

                    {/* User */}
                    <Link
                        href={isLoggedIn ? "/user" : "/sign-in"}
                        className="cursor-pointer"
                    >
                        <User />
                    </Link>
                </div>
            </div>

            {/* Nav */}
           <Nav categories={categories}/>
        </header>
    );
}
