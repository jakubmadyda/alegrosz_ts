import Grid from '@mui/material/Grid';
import {
    Alert,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product, ProductWithCategories } from '../types/product';
import { ApiType } from '../types/api';
import { CategoryApi, Subcategory } from '../types/category';
import { Search } from './Inputs/Search';
import ProductList from './Products/ProductList';

async function getData<T>({ endpoint, signal }: ApiType): Promise<T[]> {
    const init: { signal?: AbortSignal } = {};
    if (signal !== undefined) {
        init.signal = signal;
    }

    const response = await fetch(`/api/v1/${endpoint}`, init);

    return response.json();
}

async function getProductsWithCategories(
    signal: AbortSignal
): Promise<ProductWithCategories[]> {
    const response: [Product[], CategoryApi[], Subcategory[]] =
        await Promise.all([
            getData<Product>({ endpoint: 'products', signal }),
            getData<CategoryApi>({ endpoint: 'categories', signal }),
            getData<Subcategory>({ endpoint: 'subcategories', signal }),
        ]);

    const [products, categories, subcategories] = response;

    return products.map((product) => ({
        ...product,
        category: categories.find(
            (category) => product.category === category.id
        ),
        subcategory: subcategories.find(
            (subcategory) => product.subcategory === subcategory.id
        ),
    }));
}

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState<ProductWithCategories[]>([]);
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [sortParam, setSortParam] = useState<string>(
        searchParams.get('sortBy') || ''
    );

    const location = useLocation();
    const [msg, setMsg] = useState<boolean | undefined>(
        location.state?.deleted
    );

    useEffect(() => {
        const controller = new AbortController();

        getProductsWithCategories(controller.signal).then(setProducts);

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        // TODO: create query params for product search
        const queryParams: { sortBy?: string; query?: string } = {};

        if (sortParam || query) {
            queryParams.sortBy = sortParam;
            queryParams.query = query;
        }

        setSearchParams(queryParams);
    }, [sortParam, query]);

    function handleSortPrice(e: SelectChangeEvent) {
        setSortParam(e.target.value);
    }

    // TODO: create loader

    return (
        <Box sx={{ my: '20px' }}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
                    {/* TODO: msg doesn't disappear on reload */}
                    {msg && (
                        <Alert
                            sx={{ marginBottom: '20px' }}
                            severity="success"
                            onClose={() => {
                                setMsg(false);
                            }}
                        >
                            Product: {location.state.name} has been deleted.
                        </Alert>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Search value={query} setQuery={setQuery} />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel id="priceSortingLabel">
                            Sort by price
                        </InputLabel>
                        <Select
                            labelId="priceSortingLabel"
                            id="priceSorting"
                            value={sortParam}
                            label="Sort by price"
                            onChange={handleSortPrice}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="asc">Ascending</MenuItem>
                            <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container spacing={2}>
                    <ProductList
                        products={products}
                        query={query}
                        sortParam={sortParam}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;
