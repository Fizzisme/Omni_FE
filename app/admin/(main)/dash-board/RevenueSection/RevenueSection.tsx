import RevenueChart from "@/app/admin/(main)/dash-board/RevenueChart/RevenueChart";
import { getRevenue } from "@/app/admin/(main)/dash-board/action";
import Link from "next/link";

export default async function RevenueSection({
                                                 monthParam,
                                             }: {
    monthParam: string | undefined;
}) {
    const month = Number(monthParam) || new Date().getMonth() + 1;

    const revenue = await getRevenue(month);
    return (
        <div className="bg-white p-6 rounded-xl border mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                    Revenue Month {month}
                </h2>

                {/* SELECT MONTH (SERVER STYLE) */}
                <div className="flex gap-2">
                    {Array.from({ length: 12 }, (_, i) => (
                        <Link
                            key={i + 1}
                            href={`?month=${i + 1}`}
                            className={`px-3 py-1 rounded border text-sm ${
                                month === i + 1
                                    ? "bg-orange-500 text-white"
                                    : "bg-white"
                            }`}
                        >
                            {i + 1}
                        </Link>
                    ))}
                </div>
            </div>

            <RevenueChart data={revenue.data} />
        </div>
    );
}