import { useFormik } from 'formik';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import DropInput from '../DropInput/DropInput';
import { useEffect, useState } from 'react';
import { en } from '@faker-js/faker';

// [{id, name, subcategories: [{id, name}]}]

interface Kind {
    id: number;
    name: string;
}

interface Category extends Kind {
    subcategories: Kind[];
}

async function getKind(endpoint: string) {
    const response = await fetch(`/api/v1/${endpoint}`);

    return response.json();
}

async function getCategoriesWithSubCategories() {
    const response = await Promise.all([
        getKind('categories'),
        getKind('subcategories'),
    ]);

    const [categories, subcategories] = response;

    return categories.map((category) => ({
        ...category,
        subcategories: category.subcategories.map((subcategoryId) =>
            subcategories.find(
                (subcategory) => subcategory.id === subcategoryId
            )
        ),
    }));
}

function ProductForm() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategoriesWithSubCategories().then(setCategories);
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            image: '',
            stockCount: 0,
            barcode: '',
            category: '',
            subCategory: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <Box sx={{ my: '20px' }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid spacing={2} container>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            multiline
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="price"
                            label="Price"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <DropInput />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="stockCount"
                            label="Stock Count"
                            type="number"
                            value={formik.values.stockCount}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            id="barcode"
                            label="Bar code"
                            value={formik.values.barcode}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="categoryLbl">Category</InputLabel>
                            <Select
                                labelId="categoryLbl"
                                id="category"
                                name="category"
                                value={formik.values.category}
                                label="Category"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Computers">Computers</MenuItem>
                                <MenuItem value="Consoles">Consoles</MenuItem>
                                <MenuItem value="Monitors">Monitors</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="categoryLbl">
                                Sub Category
                            </InputLabel>
                            <Select
                                labelId="subCategoryLbl"
                                id="subCategory"
                                name="subCategory"
                                value={formik.values.subCategory}
                                label="Sub Category"
                                onChange={formik.handleChange}
                            >
                                <MenuItem value={10}>Computers</MenuItem>
                                <MenuItem value={20}>Consoles</MenuItem>
                                <MenuItem value={30}>Monitors</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <Button variant="contained" type="submit">
                            Add Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default ProductForm;
