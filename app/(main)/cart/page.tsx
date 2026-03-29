'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import {Trash} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

type CartItem = {
    _id: string;
    categoryId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const router = useRouter();
    // 🔥 load cart
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(data);
    }, []);

    // 🔥 update localStorage
    const updateCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

    // 🔥 tăng giảm quantity
    const updateQuantity = (id: string, delta: number) => {
        const newCart = cart.map(item =>
            item._id === id
                ? {
                    ...item,
                    quantity: Math.max(1, Math.min(100, item.quantity + delta)),
                }
                : item
        );

        updateCart(newCart);
    };

    const removeItem = (id: string) => {
        const confirmDelete = confirm("Remove this item?");
        if (!confirmDelete) return;

        const newCart = cart.filter(item => item._id !== id);
        updateCart(newCart);
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckOut = () => {

            const checkout = { cart, total };
            localStorage.setItem("checkout", JSON.stringify(checkout));


        router.push("/checkout");
    }

    return (
        <main className="max-w-6xl mx-auto px-2 py-10">
            <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-20">
                    Your cart is empty
                </p>
            ) : (
                <div className="grid grid-cols-3 gap-8">
                    {/* LEFT */}
                    <div className="col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-4 border rounded-xl p-4"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className="rounded-lg object-cover"
                                />

                                <div className="flex-1">
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p className="text-orange-500 font-bold mt-1">
                                        ${item.price}
                                    </p>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center gap-3 bg-gray-200 px-3 py-1 rounded-full">
                                    <button
                                        onClick={() => updateQuantity(item._id, -1)}
                                        className="font-bold"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, 1)}
                                        className="font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Subtotal */}
                                <div className="w-20 text-right font-semibold">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeItem(item._id)}
                                    className="text-red-500 font-bold text-lg px-2 cursor-pointer"
                                >
                                    <Trash />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT */}
                    <div className="border rounded-xl p-6 h-fit">
                        <h2 className="text-lg font-semibold mb-4">
                            Order Summary
                        </h2>

                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between mb-4">
                            <span>Shipping</span>
                            <span>$0.00</span>
                        </div>

                        <div className="flex justify-between font-bold text-lg border-t pt-4">
                            <span>Total</span>
                            <span className="text-orange-500">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <Link href="/checkout">
                            <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 cursor-pointer"
                            onClick={handleCheckOut}
                            >
                                CHECKOUT
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </main>
    );
}