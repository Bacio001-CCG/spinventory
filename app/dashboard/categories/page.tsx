import { DataTable } from "@/components/categories/table";
import { getCategories } from "@/lib/categories";

export default async function Page() {
    const data = await getCategories();

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable data={data} />
        </div>
    );
}
