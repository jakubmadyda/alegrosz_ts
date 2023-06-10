import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CssBaseline } from '@mui/material';
import CategoriesProvider from './components/Providers/CategoriesProvider';
import CartProvider from './components/Providers/CartProvider';

function App() {
    return (
        <>
            <CssBaseline />
            <CartProvider>
                <CategoriesProvider>
                    <RouterProvider router={router} />
                </CategoriesProvider>
            </CartProvider>
        </>
    );
}

export default App;
