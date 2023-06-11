import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductCart } from '../../types/product';

function CartTotal() {
    const [cartProducts, setCartProducts] = useContext(CartContext);

    function calculateTotal(products: ProductCart[]): number {
        return +products
            .reduce((acc, ce) => acc + ce.price * ce.quantity, 0)
            .toFixed(2);
    }

    function clearCart() {
        setCartProducts([]);
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <Typography variant="subtitle2">
                    {cartProducts && cartProducts.length > 0
                        ? `$${calculateTotal(cartProducts)}`
                        : `Your cart is empty.`}
                </Typography>
                {cartProducts && cartProducts.length > 0 && (
                    <Button
                        onClick={clearCart}
                        variant="contained"
                        color="error"
                        size="small"
                    >
                        clear
                    </Button>
                )}
            </Box>
        </>
    );
}

export default CartTotal;
