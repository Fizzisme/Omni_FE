import Header from "@/components/Header/Header";
import {BE_URL} from "@/lib/constants";

const getCategories = async () => {
    const res = await fetch(`${BE_URL}/v1/categories`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}

export default async function MainLayout({children}: {children: React.ReactNode}) {
    const categories = await getCategories().then(res => res.data);
    return (
    <main>
        <Header categories = {categories} />
        {children}
    </main>
  );
};