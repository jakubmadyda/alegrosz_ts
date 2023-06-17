import { ProductCart, ProductWithCart } from '../../types/product';
import ProductItem from './ProductItem';
import { Grid, Typography } from '@mui/material';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { LocalStorageValue } from '../../types/localStorage';
import { getProductsWithCategories } from '../../api/api';

type ProductListProps = {
    query: string;
    sortParam: string;
};

function ProductList({ query, sortParam }: ProductListProps) {
    const [watchList, setWatchList] = useState(0);
    const [cartProducts, setCartProducts] = useContext(CartContext);
    const [products, setProducts] = useState<ProductWithCart[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        getProductsWithCategories(controller.signal).then(setProducts);

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        setProducts(
            products.map((product) => {
                if (product?.isInCart) {
                    return product;
                } else if (
                    cartProducts &&
                    cartProducts.some(({ id }) => id === product.id)
                ) {
                    return { ...product, isInCart: true };
                }
                return product;
            })
        );
    }, [cartProducts]);

    const handleAddToWatchList = useCallback(function () {
        setWatchList((prevState) => prevState + 1);
    }, []);

    const handleAddToCart = useCallback(
        function (product: ProductCart) {
            setCartProducts(
                (
                    prevState: LocalStorageValue<ProductCart[]> | undefined
                ): ProductCart[] => {
                    if (prevState === undefined) {
                        return [];
                    }
                    const cartProduct: ProductCart | undefined = prevState.find(
                        (cartProduct) => cartProduct.id === product.id
                    );

                    if (cartProduct === undefined) {
                        return [...prevState, product];
                    }

                    cartProduct.quantity += 1;

                    return [...prevState];
                }
            );
        },
        [setCartProducts]
    );

    return (
        <>
            <Grid item xs={12}>
                <Typography>Watched Products: {watchList}</Typography>
            </Grid>
            {products
                .filter((product) =>
                    `${product.name} ${product.description}`
                        .toLowerCase()
                        .includes(query.toLowerCase())
                )
                .sort((a, b) => {
                    if (sortParam === 'asc') {
                        return a.price - b.price;
                    }
                    if (sortParam === 'desc') {
                        return b.price - a.price;
                    }
                    return 0;
                })
                .map((product) => (
                    <Grid item xs={4} key={product.id}>
                        <ProductItem
                            product={product}
                            handleAddToWatchList={handleAddToWatchList}
                            handleAddToCart={handleAddToCart}
                        />
                    </Grid>
                ))}
        </>
    );
}

const ProductListMemoized = memo(ProductList);

export default ProductListMemoized;
