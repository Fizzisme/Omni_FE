'use client';

import { useState } from 'react';
import StarRating from '@/components/StarRating/StarRating';
import Link from 'next/link';

export interface IProducts{
    _id: string;
    categoryId: string;
    name: string;
    price: number;
    raiting: string;
    image: string;
}

export default function ProductCard({ product, categorySlug }: { product: IProducts, categorySlug: string }) {
    const [wished, setWished] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 1000);
    };


    return (
        <Link href={`/shop/${categorySlug}/${product._id}`}>
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#f5ede6] cursor-pointer">
                {/* Wishlist */}
                <button
                    onClick={() => setWished(!wished)}
                    className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-sm hover:scale-110 transition-transform"
                >
                    <svg
                        className={`w-4 h-4 transition-colors ${
                            wished ? 'text-rose-500 fill-rose-500' : 'text-gray-400'
                        }`}
                        fill={wished ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                {/* Image */}
                <div className="relative bg-[#faf7f4] overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Info */}
                <div className="p-3">
                    <p className="text-[10px] font-semibold tracking-widest text-[#e8590c] mb-1">{categorySlug}</p>
                    <h3 className="text-[1rem] text-[#573727] font-bold leading-snug mb-2 min-h-[2.5rem]">
                        {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-[#e75100]">$ {product.price}</p>
                            <StarRating rating={product.raiting} />
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                                added ? 'bg-green-500' : 'bg-[#e8785a] hover:bg-[#d4664a]'
                            }`}
                        >
                            {added ? (
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M17 21a1 1 0 100-2 1 1 0 000 2zm-10 0a1 1 0 100-2 1 1 0 000 2z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
