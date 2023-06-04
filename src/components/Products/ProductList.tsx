import { ProductWithCategories } from '../../types/product';
import ProductItem from './ProductItem';
import { Grid } from '@mui/material';

type ProductListProps = {
    products: ProductWithCategories[];
    query: string;
};

function ProductList({ products, query }: ProductListProps) {
    return (
        <>
            {products
                .filter((product) =>
                    `${product.name} ${product.description}`
                        .toLowerCase()
                        .includes(query.toLowerCase())
                )
                .map((product) => (
                    <Grid item xs={4} key={product.id}>
                        <ProductItem product={product} />
                    </Grid>
                ))}
        </>
    );
}

export default ProductList;
