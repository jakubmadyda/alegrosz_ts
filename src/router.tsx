import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProductForm from './components/Products/ProductForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <h1>Home</h1>,
            },
            {
                path: '/contact',
                element: <h1>Contact</h1>,
            },
            {
                path: '/add-product',
                element: <ProductForm />,
            },
        ],
    },
    {
        path: '/register',
        element: <h1>Register</h1>,
    },
]);
