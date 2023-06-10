import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { useEffect, useState } from 'react';
import { Loader } from '../Feedback/Loader';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { faker } from '@faker-js/faker';

async function getProduct(
    endpoint: string,
    signal: AbortSignal
): Promise<Product> {
    const response = await fetch(`/api/v1/${endpoint}`, { signal });

    return response.json();
}

async function deleteProduct(endpoint: string): Promise<Record<string, never>> {
    const response = await fetch(`/api/v1/${endpoint}`, {
        method: 'DELETE',
    });
    return response.json();
}

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        if (id !== undefined) {
            getProduct(`products/${id}`, controller.signal).then(setProduct);
        } else {
            // TODO: create error boundary for this component
            throw new Error(`Invalid query params id: ${id}`);
        }

        return () => {
            controller.abort();
        };
    }, [id]);

    async function handleDelete() {
        await deleteProduct(`products/${id}`);
        navigate(`/`, {
            state: {
                name: product?.name as string,
                deleted: true,
            },
        });
    }

    if (!product) {
        return <Loader />;
    }
    return (
        <>
            <Box sx={{ my: '20px' }}>
                <Grid spacing={2} container>
                    <Grid item xs={12}>
                        <Typography variant="h1" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {product.category}/{product.subcategory}
                        </Typography>
                        <Grid spacing={2} container>
                            <Grid item xs={6}>
                                <Card
                                    xs={{
                                        maxWidth: 440,
                                    }}
                                >
                                    <CardMedia
                                        sx={{ height: 500 }}
                                        image={faker.image.urlLoremFlickr({
                                            category: 'technics',
                                        })}
                                        title={product.name}
                                    />
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper
                                    elevation={1}
                                    style={{
                                        padding: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Typography variant="body1">
                                        {product.description}
                                    </Typography>
                                </Paper>
                                <Paper
                                    elevation={2}
                                    style={{
                                        padding: 10,
                                        display: 'flex',
                                        gap: 20,
                                        alignItems: 'center',
                                        marginBottom: 10,
                                    }}
                                >
                                    <Typography variant="h5">
                                        price: ${product.price}
                                    </Typography>
                                    <Button variant="outlined">Buy now</Button>
                                </Paper>
                                <Paper
                                    elevation={1}
                                    style={{
                                        padding: 10,
                                        display: 'flex',
                                        gap: 20,
                                    }}
                                >
                                    <Button variant="outlined">Edit</Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleDelete}
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default ProductDetails;
