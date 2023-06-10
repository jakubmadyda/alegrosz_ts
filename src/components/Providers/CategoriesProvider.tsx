import { PropsWithChildren, useEffect, useState } from 'react';
import { CategoriesContext } from '../../context/CategoriesContext';
import { Category, CategoryApi, Subcategory } from '../../types/category';
import { getData } from '../../api/api';

async function getCategoriesAndSubcategories(
    signal: AbortSignal
): Promise<Category[]> {
    const response: [CategoryApi[], Subcategory[]] = await Promise.all([
        getData<CategoryApi>({ endpoint: 'categories', signal }),
        getData<Subcategory>({ endpoint: 'subcategories', signal }),
    ]);

    const [categories, subcategories] = response;

    return categories.map((category) => ({
        ...category,
        subcategories: category.subcategories.map((subcategoryId) =>
            subcategories.find(
                (subcategory) => subcategory.id === subcategoryId
            )
        ),
    }));
}

function CategoriesProvider({ children }: PropsWithChildren) {
    const [categories, setCategories] = useState<Category[] | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        getCategoriesAndSubcategories(controller.signal).then(setCategories);

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    );
}

export default CategoriesProvider;
