export interface Kind {
    id: number;
    name: string;
}

export interface Subcategory {
    id: number;
    name: string;
}

export interface Category extends Kind {
    subcategories: Array<Subcategory | undefined>;
}

export interface CategoryApi extends Kind {
    subcategories: number[];
}
