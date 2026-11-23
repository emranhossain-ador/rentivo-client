import { getCategories } from "@/lib/api/categoris";
import { CategoryType } from "@/lib/type/categoryType";
import CategoryCarousel from "./home/CategoryCarousel";

const CategoriesContent = async () => {
    const categories: CategoryType[] = await getCategories();
    return (
        < CategoryCarousel categories={categories} />
    )
}

export default CategoriesContent;