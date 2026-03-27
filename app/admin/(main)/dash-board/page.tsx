import { ShoppingCart, AlertTriangle } from 'lucide-react';
import Link from "next/link";
import RevenueSection from "@/app/admin/(main)/dash-board/RevenueSection/RevenueSection";
import RiskPieChart from "@/app/admin/(main)/dash-board/RiskPieChart/RiskPieChart";
import {BE_URL} from "@/lib/constants";
const getOrders = async () => {
    const res = await fetch(`${BE_URL}/v1/orders`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    return res.json();
}



export default async function AdminDashboard({
                                                 searchParams,
                                             }: {
    searchParams: Promise<{ month?: string }>;
}) {
    const params = await  searchParams;
    const monthParam = params?.month;
    const orders = await getOrders().then((res) => res.data);
    const totalOrders = orders.length;
    const highRisk = orders.filter(o => o.aiAnalyst.risk === 'HIGH').length;
    const mediumRisk = orders.filter(o => o.aiAnalyst.risk === 'MEDIUM').length;
    const lowRisk = orders.filter(o => o.aiAnalyst.risk === 'LOW').length;


    return (
        <main className="flex-1 p-6">

                {/* HEADER */}
                <h1 className="text-2xl font-semibold mb-6 text-[#1c1a17]">
                    Dashboard
                </h1>

                {/* CARDS */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl border">
                        <div className="flex items-center gap-2">
                            <ShoppingCart />
                            <span>Total Orders</span>
                        </div>
                        <p className="text-xl font-bold mt-2">{totalOrders}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border">
                        <div className="flex items-center gap-2 text-red-500">
                            <AlertTriangle />
                            <span>High Risk</span>
                        </div>
                        <p className="text-xl font-bold mt-2">{highRisk}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border">
                        <div className="flex items-center gap-2 text-yellow-500">
                            <AlertTriangle />
                            <span>Medium Risk</span>
                        </div>
                        <p className="text-xl font-bold mt-2">{mediumRisk}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border">
                        <div className="flex items-center gap-2 text-green-500">
                            <AlertTriangle />
                            <span>Low Risk</span>
                        </div>
                        <p className="text-xl font-bold mt-2">{lowRisk}</p>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white p-4 rounded-xl border">
                    <h2 className="mb-4 font-medium">Orders</h2>
                    <table className="w-full text-sm">
                        <thead>
                        <tr className="text-left border-b">
                            <th className="p-2">Order ID</th>
                            <th className="p-2">Total</th>
                            <th className="p-2">Model predict</th>
                            <th className="p-2">Risk</th>
                            <th className="p-2">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((o) => (
                            <tr key={o._id} className="border-b hover:bg-gray-50">

                                <td className="p-0">
                                    <Link href={`/admin/orders/${o._id}`} className="block p-2 w-full h-full">
                                        #{o._id}
                                    </Link>
                                </td>

                                <td className="p-0">
                                    <Link href={`/admin/orders/${o._id}`} className="block p-2 w-full h-full">
                                        ${o.total}
                                    </Link>
                                </td>

                                <td className="p-0">
                                    <Link href={`/admin/orders/${o._id}`} className="block p-2 w-full h-full">
                                        {o.aiAnalyst.fraud}
                                    </Link>
                                </td>

                                <td className="p-0">
                                    <Link href={`/admin/orders/${o._id}`} className="block p-2 w-full h-full">
          <span
              className={`px-2 py-1 rounded text-xs ${
                  o.aiAnalyst.risk === 'HIGH'
                      ? 'bg-red-100 text-red-600'
                      : o.aiAnalyst.risk === 'MEDIUM'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
              }`}
          >
            {o.aiAnalyst.risk}
          </span>
                                    </Link>
                                </td>

                                <td className="p-0">
                                    <Link href={`/admin/orders/${o._id}`} className="block p-2 w-full h-full">
          <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                  o.status === 'PENDING'
                      ? 'bg-orange-100 text-orange-600'
                      : o.status === 'APPROVE'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
              }`}
          >
            {o.status}
          </span>
                                    </Link>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* CHART PLACEHOLDER */}
               <RevenueSection monthParam={monthParam} />
            <RiskPieChart
                high={highRisk}
                medium={mediumRisk}
                low={lowRisk}
            />
            </main>
    );
}
