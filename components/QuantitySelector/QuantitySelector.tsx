'use client';

import { useState } from 'react';
import { Minus } from 'lucide-react';
import { Plus } from '@/components/animate-ui/icons/plus';

export default function QuantitySelector({ onChange }: { onChange?: (q: number) => void }) {
    const [quantity, setQuantity] = useState(1);

    const update = (q: number) => {
        setQuantity(q);
        onChange?.(q);
    };

    return (
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 gap-4">
            <Minus
                onClick={() => update(Math.max(1, quantity - 1))}
                className="cursor-pointer"
                size={15}
            />
            <span>{quantity}</span>
            <Plus
                onClick={() => update(Math.min(100, quantity + 1))}
                className="cursor-pointer"
                size={15}
            />
        </div>
    );
}