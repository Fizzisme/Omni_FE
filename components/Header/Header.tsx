'use client';

import {useEffect, useState} from 'react';
import { Heart, ShoppingBag, User } from 'lucide-react';
import { ChevronRight } from '@/components/animate-ui/icons/chevron-right';
import { ChevronLeft } from '@/components/animate-ui/icons/chevron-left';
import Image from 'next/image';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';

interface ICategories{
    _id: string;
    name: string;
    slug: string;
}

export default function Header({categories}:{categories: ICategories[]}) {

    const [activeNav, setActiveNav] = useState('SHOP');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8017/v1/users/me', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                console.log(data)
                setIsLoggedIn(!!data);
            });
    }, []);
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
            <nav className="bg-[#ffe7db]">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-center py-1">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-6">
                            {/* HOME */}
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/"
                                    className={`text-sm font-semibold tracking-widest transition-colors cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent
              ${
                  activeNav === 'HOME'
                      ? 'text-[#e45001] border-b-2 border-[#e45001] pb-0.5'
                      : 'text-[#664c3f] hover:text-[#e45001]'
              }`}
                                    onClick={() => setActiveNav('HOME')}
                                >
                                    HOME
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* ABOUT US */}
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/about"
                                    className={`text-sm font-semibold tracking-widest transition-colors cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent
              ${
                  activeNav === 'ABOUT US'
                      ? 'text-[#e45001] border-b-2 border-[#e45001] pb-0.5'
                      : 'text-[#664c3f] hover:text-[#e45001]'
              }`}
                                    onClick={() => setActiveNav('ABOUT US')}
                                >
                                    ABOUT US
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {/* SHOP — có dropdown */}
                            <NavigationMenuItem>
                                <NavigationMenuTrigger
                                    className={` text-sm font-semibold tracking-widest transition-colors cursor-pointer bg-transparent hover:bg-[#ffd0b8] focus:bg-transparent data-[state=open]:bg-transparent
      `}
                                    onClick={() => setActiveNav('SHOP')}
                                >
                                    SHOP
                                </NavigationMenuTrigger>

                                <NavigationMenuContent className="bg- border border-[#f0e0d6] shadow-lg rounded-md">
                                    <ul className="w-48 p-2">
                                        {categories.map((cat) => (
                                            <li key={cat.slug}>
                                                <NavigationMenuLink
                                                    href={`/shop/${cat.slug}`}
                                                    className="block px-3 py-2 text-sm text-[#ffd0b8] rounded hover:bg-[#fff1eb] hover:text-[#e45001] transition-colors"
                                                >
                                                    {cat.name}
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {/* SUPPORT */}
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="/support"
                                    className={`text-sm font-semibold tracking-widest transition-colors cursor-pointer bg-transparent hover:bg-transparent focus:bg-transparent
              ${
                  activeNav === 'SUPPORT'
                      ? 'text-[#e45001] border-b-2 border-[#e45001] pb-0.5'
                      : 'text-[#664c3f] hover:text-[#e45001]'
              }`}
                                    onClick={() => setActiveNav('SUPPORT')}
                                >
                                    SUPPORT
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>
        </header>
    );
}
