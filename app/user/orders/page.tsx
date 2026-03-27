import Link from 'next/link';
import { cookies } from 'next/headers';

async function getOrders() {

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
        return {
            success: false,
            error: "No access token",
        };
    }

    const res = await fetch('http://localhost:8017/v1/users/my-orders', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) return [];

    const data = await res.json();
    return data.data || [];
}

export default async function UserOrdersPage() {
    const orders = await getOrders();

    return (
        <div className="bg-white p-6 rounded-xl border">
            <h2 className="mb-4 font-medium text-lg">My Orders</h2>

            <table className="w-full text-sm">
                <thead>
                <tr className="text-left border-b">
                    <th className="p-2">Order ID</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Status</th>
                </tr>
                </thead>

                <tbody>
                {orders.map((o: any) => (
                    <tr key={o._id} className="border-b hover:bg-gray-50">

                        {/* ID */}
                        <td className="p-0">
                            <Link href={`/user/orders/${o._id}`} className="block p-2">
                                #{o._id}
                            </Link>
                        </td>

                        {/* Total */}
                        <td className="p-0">
                            <Link href={`/user/orders/${o._id}`} className="block p-2">
                                ${o.total}
                            </Link>
                        </td>


                        {/* Status */}
                        <td className="p-0">
                            <Link href={`/user/orders/${o._id}`} className="block p-2">
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
    );
}