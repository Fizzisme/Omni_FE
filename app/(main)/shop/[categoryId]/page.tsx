import ProductCard, {IProducts} from '@/components/ProductCard/ProductCard';
import {BE_URL} from "@/lib/constants";

interface Props {
    params: Promise<{ categoryId: string }>;
}

export async function getProductsByCategory(categoryId: string) {
    const res = await fetch(`${BE_URL}/v1/products/${categoryId}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export async function getCategoryBySlug(slug: string) {
    const res = await fetch(`${BE_URL}/v1/categories/${slug}`, {
        cache: "no-store",
    })
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export default async function CategoryPage({ params }: Props) {
    const { categoryId } = await params;
    const category = await getCategoryBySlug(categoryId).then(res => res.data);

    const products = await getProductsByCategory(categoryId).then(res => res.data);

    const filtered = products.filter((p: IProducts) => p.categoryId === category._id);

    const label = category.slug;

    return (
        <div className="min-h-screen">
            {/* Main */}
            <main className="max-w-6xl mx-auto py-10 px-4">
                <h1 className="text-[2rem] font-bold text-center tracking-widest mb-8 text-[#e75100]">{label}</h1>

                {filtered.length === 0 ? (
                    <p className="text-center text-gray-400 mt-20">No products found.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                        {filtered.map((product: IProducts) => (
                            <ProductCard key={product._id} product={product} categorySlug = {label} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
