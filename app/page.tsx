import { redirect } from "next/navigation";
export default function HomePage() {
    redirect("/shop/clothing");
    return null;
};