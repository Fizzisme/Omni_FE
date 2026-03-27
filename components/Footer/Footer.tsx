import Image from 'next/image';

const footerShop = ['Clothing', 'Electronics', 'Toys and Games', 'Home & Garden', 'Health & Beauty'];
const footerPolicy = ['Privacy Policy', 'Return Policy', 'Shipping Policy', 'Shopping Guide'];

export default function Footer() {
    return (
        <footer className="bg-[#fdf0e8] mt-16 pt-10 pb-6">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-4 gap-8">
                {/* Logo col */}
                <Image src={'/logo.png'} alt={'logo'} height={200} width={200} priority  />

                {/* Policy */}
                <div>
                    <h3 className="text-lg font-bold tracking-widest text-[#e75100] mb-2">POLICY</h3>
                    <ul className="space-y-2">
                        {footerPolicy.map((item) => (
                            <li key={item}>
                                <a href="#" className="text-sm text-gray-600 hover:text-[#e8785a] transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Shop */}
                <div>
                    <h3 className="text-lg font-bold tracking-widest text-[#e75100] mb-2">SHOP</h3>
                    <ul className="space-y-2">
                        {footerShop.map((item) => (
                            <li key={item}>
                                <a href="#" className="text-sm text-gray-600 hover:text-[#e8785a] transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-bold tracking-widest text-[#e75100] mb-2">CONTACT</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-gray-600">
                            <svg
                                className="w-4 h-4 text-[#e8785a] mt-0.5 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            279 Nguyen Tri Phuong, Dien Hong
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                            <svg
                                className="w-4 h-4 text-[#e8785a] shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            omnicart@gmail.com
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                            <svg
                                className="w-4 h-4 text-[#e8785a] shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            +84 916 367 385
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-[#f0d9c8] text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Omni. All rights reserved.
            </div>
        </footer>
    );
}
