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
import { memo, useContext, useEffect, useState } from 'react';
import { Search } from './Inputs/Search';
import ProductList from './Products/ProductList';
import { CategoriesContext } from '../context/CategoriesContext';

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState<string>(searchParams.get('query') || '');
    const [category, setCategory] = useState<string>(
        searchParams.get('category') || ''
    );
    const [sortParam, setSortParam] = useState<string>(
        searchParams.get('sortBy') || ''
    );

    const location = useLocation();
    const [msg, setMsg] = useState<boolean | undefined>(
        location.state?.deleted
    );

    const categories = useContext(CategoriesContext);

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

    function handleFilterCategory(e) {
        setCategory(e.target.value);
    }

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
                <Grid item xs={12}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <InputLabel id="categoriesLabel">
                            Filter by category
                        </InputLabel>
                        <Select
                            labelId="categoriesLabel"
                            id="categories"
                            value={category}
                            label="Choose category"
                            onChange={handleFilterCategory}
                        >
                            <MenuItem value="">None</MenuItem>
                            {categories &&
                                categories.map(({ name, id }) => (
                                    <MenuItem value={name} key={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container spacing={2}>
                    <ProductList
                        query={query}
                        sortParam={sortParam}
                        category={category}
                        setCategory={setCategory}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

const HomeMemoized = memo(Home);

export default HomeMemoized;
