'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // optional auto redirect after 5s
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f4ef] px-4">
            <div className="bg-white border border-[#e0d9d0] rounded-2xl shadow-md p-10 max-w-md w-full text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <CheckCircle size={64} className="text-green-500" />
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-[#1c1a17] mb-2">
                    Order Successful 🎉
                </h1>

                {/* Description */}
                <p className="text-sm text-[#8a8278] mb-6">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                {/* Info box */}
                <div className="bg-[#f7f4ef] border border-[#e0d9d0] rounded-lg p-4 mb-6 text-sm text-[#1c1a17]">
                    <p className="mb-1">📦 Your order is being processed</p>
                    <p>📧 A confirmation email will be sent shortly</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full py-3 bg-[#d95f02] text-white rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Continue Shopping
                    </button>

                    <button
                        onClick={() => router.push('/orders')}
                        className="w-full py-3 border border-[#e0d9d0] rounded-lg text-[#1c1a17] hover:bg-[#f7f4ef] transition"
                    >
                        View Orders
                    </button>
                </div>

                {/* Auto redirect hint */}
                <p className="text-xs text-[#8a8278] mt-6 italic">
                    You will be redirected to homepage in 5 seconds...
                </p>
            </div>
        </div>
    );
}
