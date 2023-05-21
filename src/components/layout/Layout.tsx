import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <h2>Menu</h2>
            <Outlet />
        </>
    );
}

export default Layout;
