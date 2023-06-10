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
import { ProductCart, ProductWithCategories } from '../../types/product';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

type ProductItemProps = {
    product: ProductWithCategories;
};

function ProductItem({ product }: ProductItemProps) {
    const [cartProducts, setCartProducts] = useContext(CartContext);

    function addToCartQuick() {
        let cartProduct: ProductCart | undefined = cartProducts.find(
            (cartProduct) => cartProduct.id === product.id
        );

        if (cartProduct === undefined) {
            cartProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            } as ProductCart;

            setCartProducts([...cartProducts, cartProduct]);
        } else {
            cartProduct.quantity += 1;

            setCartProducts([...cartProducts]);
        }
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
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default ProductItem;
