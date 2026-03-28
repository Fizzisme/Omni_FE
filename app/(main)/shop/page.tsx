import ProductCard, {IProducts} from "@/components/ProductCard/ProductCard";
import {BE_URL} from "@/lib/constants";

const getProducts = async () => {
    const res = await fetch(`${BE_URL}/v1/products/`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

const getCategoryById = async (id: string) => {
    const res = await fetch(`${BE_URL}/v1/categories/get-by-id/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}


export default async function ShopPage() {
    const products = await getProducts().then(res => res.data);

  return (
      <div className="min-h-screen">
          {/* Main */}
          <main className="max-w-6xl mx-auto py-10 px-4">
              <h1 className="text-[2rem] font-bold text-center tracking-widest mb-8 text-[#e75100] uppercase">SHOP</h1>

              {products.length === 0 ? (
                  <p className="text-center text-gray-400 mt-20">No products found.</p>
              ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                      {products.map(async  (product: IProducts) => {

                          const category = await getCategoryById(product.categoryId).then(res => res.data);
                          return (
                              <ProductCard key={product._id} product={product} categorySlug = {category.slug} categoryName = {category.name} />
                          )
                          }
                      )}
                  </div>
              )}
          </main>
      </div>
  );
};