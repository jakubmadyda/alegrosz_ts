import { faker } from '@faker-js/faker';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Typography,
} from '@mui/material';
import { ProductCart, ProductWithCart } from '../../types/product';
import { Link } from 'react-router-dom';
import { memo, useContext } from 'react';
import { CartContext } from '../../context/CartContext';

type ProductItemProps = {
    product: ProductWithCart;
    handleAddToWatchList: () => void;
    handleAddToCart: (product: ProductCart) => void;
};

function ProductItem({
    product,
    handleAddToWatchList,
    handleAddToCart,
}: ProductItemProps) {
    const [cartProducts, setCartProducts] = useContext(CartContext);

    function addToCartQuick() {
        handleAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    }

    function isInCart(): boolean {
        return false;
        // return cartProducts !== undefined
        //     ? cartProducts.some(({ id }) => id === product.id)
        //     : false;
    }

    console.log('magic');

    function deleteFromCart() {
        // const updatedCart: ProductCart[] = [];
        //
        // for (const cartProduct of cartProducts || []) {
        //     if (cartProduct.id !== product.id) {
        //         updatedCart.push(cartProduct);
        //     } else {
        //         if (cartProduct.quantity > 1) {
        //             cartProduct.quantity -= 1;
        //             updatedCart.push(cartProduct);
        //         }
        //     }
        // }
        // setCartProducts(updatedCart);
    }

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={faker.image.urlLoremFlickr({
                        category: 'technics',
                    })}
                    title={product.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Chip label={`$${product.price}`} variant="outlined" />
                </CardContent>
                <CardContent>
                    <Chip label={product.category?.name} variant="outlined" />
                    <Chip
                        label={product.subcategory?.name}
                        variant="outlined"
                    />
                </CardContent>
                <CardActions>
                    <Link to={`/products/${product.id}`}>
                        <Button variant="outlined" size="small">
                            More info
                        </Button>
                    </Link>
                    <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        onClick={addToCartQuick}
                    >
                        Quick buy
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        onClick={handleAddToWatchList}
                    >
                        Add to watchlist
                    </Button>
                    {product.isInCart && (
                        <Button
                            onClick={deleteFromCart}
                            variant="outlined"
                            size="small"
                            color="warning"
                        >
                            Undo
                        </Button>
                    )}
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

const ProductItemMemoized = memo(ProductItem);

export default ProductItemMemoized;
