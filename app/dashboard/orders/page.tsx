import { DataTable } from "@/components/orders/table";
import { getOrders, getOrdersWithCustomersAndOrderItems } from "@/lib/orders";

export default async function Page() {
    const data = await getOrdersWithCustomersAndOrderItems();
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
                <DataTable data={data} />
            </div>
        </div>
    );
}
