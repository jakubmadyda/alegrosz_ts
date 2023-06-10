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
import { ProductWithCategories } from '../../types/product';
import { Link } from 'react-router-dom';

type ProductItemProps = {
    product: ProductWithCategories;
};

function ProductItem({ product }: ProductItemProps) {
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
                        <Button size="small">More info</Button>
                    </Link>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}

export default ProductItem;
