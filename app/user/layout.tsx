// app/user/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menu = [
        { name: 'My Info', href: '/user/info' },
        { name: 'My Orders', href: '/user/orders' },
        { name: 'Home', href: '/shop' },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-orange-500 text-white p-4">
                <h2 className="text-xl font-bold mb-6">USER</h2>

                {menu.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <div
                            className={`p-2 rounded cursor-pointer mb-2 ${
                                pathname === item.href
                                    ? 'bg-white text-orange-500'
                                    : ''
                            }`}
                        >
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 bg-gray-50">{children}</div>
        </div>
    );
}