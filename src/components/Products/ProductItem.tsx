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
import { memo } from 'react';

type ProductItemProps = {
    product: ProductWithCart;
    handleAddToWatchList: () => void;
    handleAddToCart: (product: ProductCart) => void;
    handleCancelProduct: (product: ProductWithCart) => void;
    handleSelectCategory: (category: string) => void;
    category: string;
};

function ProductItem({
    product,
    handleAddToWatchList,
    handleAddToCart,
    handleCancelProduct,
    handleSelectCategory,
    category,
}: ProductItemProps) {
    function addToCartQuick() {
        handleAddToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
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
                    <Chip
                        label={product.category?.name}
                        variant={
                            category === product.category?.name
                                ? 'filled'
                                : 'outlined'
                        }
                        sx={{ mr: 1 }}
                        onClick={() =>
                            handleSelectCategory(product.category?.name || '')
                        }
                    />
                    <Chip
                        label={product.subcategory?.name}
                        variant="outlined"
                    />
                </CardContent>
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'stretch',
                    }}
                >
                    <Button variant="outlined" size="small">
                        <Link
                            to={`/products/${product.id}`}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                            Details
                        </Link>
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        onClick={addToCartQuick}
                    >
                        Buy
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        onClick={handleAddToWatchList}
                    >
                        {/*TODO: create unwatch*/}
                        +watch
                    </Button>
                    {product.isInCart && (
                        <Button
                            onClick={() => {
                                handleCancelProduct(product);
                            }}
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
