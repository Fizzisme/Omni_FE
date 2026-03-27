// app/admin/orders/[id]/page.tsx

import Image from "next/image";
import {updateOrderStatus} from "@/app/admin/(main)/orders/[orderId]/action";
import {cookies} from "next/headers";
import {BE_URL} from "@/lib/constants";

async function getOrder(id: string) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
        return {
            success: false,
            error: "No access token",
        };
    }
    const res = await fetch(`${BE_URL}/v1/users/my-orders/${id}`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch orders");
    }

    return res.json();
}

interface Props {
    params: Promise<{ orderId: string }>;
}

export default async function OrderPage({ params }: Props) {
    const {orderId} = await params;

    const order = await getOrder(orderId).then(res => res.data);

console.log(order)

    return (
        <div className="flex-1 bg-[#f7f4ef] p-6">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl border">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold">
                        Order #{order._id}
                    </h1>

                    <div className="flex items-center gap-3">
        <span
            className={`px-3 py-1 rounded text-sm font-medium
          ${order.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
          ${order.status === "APPROVE" && "bg-green-100 text-green-700"}
          ${order.status === "REJECTED" && "bg-red-100 text-red-700"}
        `}
        >
          {order.status}
        </span>
                    </div>
                </div>

                {/* CUSTOMER */}
                <div className="mb-6">
                    <h2 className="font-medium mb-2">Customer Info</h2>
                    <p>Email: {order.customer?.email}</p>
                    <p>
                        Name: {order.customer?.firstName} {order.customer?.lastName}
                    </p>
                    <p>Phone: {order.customer?.phone}</p>
                    <p>Address: {order.customer?.address}</p>
                </div>

                {/* ITEMS */}
                <div className="mb-6">
                    <h2 className="font-medium mb-2">Items</h2>

                    <div className="border rounded overflow-hidden">
                        {/* HEADER */}
                        <div className="grid grid-cols-3 bg-gray-50 text-sm font-medium border-b">
                            <div className="p-3">Item</div>
                            <div className="p-3 text-center">Quantity</div>
                            <div className="p-3 text-right">Price</div>
                        </div>

                        {/* BODY */}
                        {order.items.map((item: any) => (
                            <div
                                key={item._id}
                                className="grid grid-cols-3 items-center border-b last:border-none"
                            >
                                {/* ITEM INFO */}
                                <div className="flex items-center gap-3 p-3">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={50}
                                        height={50}
                                        className="object-cover rounded"
                                    />
                                    <span className="font-medium">{item.name}</span>
                                </div>

                                {/* QUANTITY */}
                                <div className="text-center">
                                    {item.quantity}
                                </div>

                                {/* PRICE */}
                                <div className="text-right font-medium pr-3">
                                    ${item.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PAYMENT */}
                <div className="mb-6">
                    <h2 className="font-medium mb-2">Payment</h2>
                    <p>Method: {order.paymentMethod}</p>
                </div>


                {/* TOTAL */}
                <div className="flex justify-between border-t pt-4">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">
        ${order.total}
      </span>
                </div>

            </div>
        </div>
    );
}