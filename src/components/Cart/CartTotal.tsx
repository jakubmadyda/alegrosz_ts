import { Typography } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductCart } from '../../types/product';

function CartTotal() {
    const [cartProducts] = useContext(CartContext);

    function calculateTotal(products: ProductCart[]): number {
        return +products
            .reduce((acc, ce) => acc + ce.price * ce.quantity, 0)
            .toFixed(2);
    }

    return (
        <>
            <Typography variant="subtitle2">
                {cartProducts.length > 0
                    ? `$${calculateTotal(cartProducts)}`
                    : `Your cart is empty.`}
            </Typography>
        </>
    );
}

export default CartTotal;
