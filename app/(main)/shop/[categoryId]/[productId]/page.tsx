// app/shop/[categoryId]/[productId]/page.tsx
import { categoryLabels } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import StarRating from '@/components/StarRating/StarRating';
import {getCategoryBySlug, getProductsByCategory} from "@/app/(main)/shop/[categoryId]/page";
import {IProducts} from "@/components/ProductCard/ProductCard";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";

interface Props {
    params: Promise<{ categoryId: string; productId: string }>;
}

export default async function ProductPage({ params }: Props) {
    const { categoryId, productId } = await params;
    const category = await getCategoryBySlug(categoryId).then(res=> res.data);
    const products = await getProductsByCategory(categoryId).then(res => res.data);
    const product = products.find((p: IProducts) => p._id === productId);
    console.log(product)
    if (!product) notFound();
    if (product.categoryId !== category._id) notFound();
    return (
        <main
            style={{
                padding: '60px 80px',
                display: 'flex',
                gap: '60px',
            }}
        >
            {/* LEFT */}
            <div style={{ flexShrink: 0 }}>
                <Image src={product.image} alt={product.name} width={500} height={500} style={{ objectFit: 'cover' }} />
            </div>

            {/* RIGHT */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <h2 style={{ fontSize: '12px', color: '#f97316', fontWeight: 600, textTransform: 'uppercase' }}>
                    {categoryLabels[product.category]}
                </h2>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px' }}>{product.name}</h1>
                <div style={{ marginTop: '8px' }}>
                    <StarRating rating={product.raiting} />
                </div>
                {product.brand && (
                    <p style={{ marginTop: '8px', color: '#555' }}>
                        Brand: <span style={{ fontWeight: 600 }}>{product.brand}</span>
                    </p>
                )}
                {/* price */}
                <p
                    style={{
                        fontSize: '28px',
                        color: '#ea580c',
                        fontWeight: 'bold',
                        marginTop: '24px',
                        marginLeft: '8px',
                    }}
                >
                    ${product.price}
                </p>
                {/* quantity + stock */}
                <AddToCartButton product={product} />
            </div>
        </main>
    );
}
