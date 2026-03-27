'use client';

import { useState } from 'react';
import { addToCart } from '@/lib/utils';
import QuantitySelector from "@/components/QuantitySelector/QuantitySelector";

export default function AddToCartButton({ product }: { product: any }) {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        addToCart({
            _id: product._id,
            categoryId: product.categoryId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
        });

        alert("Added to cart 🛒");
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Quantity */}

            <div className="w-fit">
                <QuantitySelector onChange={setQuantity} />
            </div>

            {/* Button */}
            <button
                onClick={handleAdd}
                className="bg-[#fed7aa] text-[#c2410c] px-6 py-3 rounded-full font-semibold"
            >
                ADD TO CART
            </button>
        </div>
    );
}