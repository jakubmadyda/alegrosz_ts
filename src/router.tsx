import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Home</h1>,
    },
    {
        path: '/contact',
        element: <h1>Contact</h1>,
    },
]);
