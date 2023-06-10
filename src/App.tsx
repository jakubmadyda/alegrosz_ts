import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CssBaseline } from '@mui/material';
import CategoriesProvider from './components/Providers/CategoriesProvider';

function App() {
    return (
        <>
            <CssBaseline />
            <CategoriesProvider>
                <RouterProvider router={router} />
            </CategoriesProvider>
        </>
    );
}

export default App;
