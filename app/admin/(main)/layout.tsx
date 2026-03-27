import Link from "next/link";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";


export default async function AdminLayout({children}: {children: React.ReactNode}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token_admin");

    if (!token) {
        redirect("/admin/sign-in");
    }


  return (
    <main className="flex min-h-screen bg-[#f7f4ef]">
      <aside className="w-64 bg-[#d95f02] text-white p-6">
        <h2 className="text-xl font-bold mb-6">ADMIN</h2>
        <nav className="flex flex-col gap-4 text-sm">
          <Link href={'/admin/dash-board'} className="cursor-pointer">Dashboard</Link>
          <span className="cursor-pointer">Orders</span>
        </nav>
      </aside>
        {children}
    </main>
  );
};