import { getCategory } from "@/lib/categories";
import CategoryForm from "@/components/categories/form";
export default async function Edit({
    params,
}: {
    params: Promise<{ "category-id": string }>;
}) {

    const resolvedParams = await params;
    const category = await getCategory(parseInt(resolvedParams["category-id"]));
    if (!category) return null;

    return (
        <div className="flex flex-col gap-3 py-4 md:gap-6 md:py-6">
            <CategoryForm category={category} />
        </div>
    );
}
