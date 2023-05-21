import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from '../Navbar/Navbar';

function Layout() {
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </>
    );
}

export default Layout;
