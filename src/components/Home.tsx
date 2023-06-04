import Grid from '@mui/material/Grid';
import { Alert, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Home() {
    const location = useLocation();
    const [msg, setMsg] = useState<boolean | undefined>(
        location.state?.deleted
    );

    return (
        <Box sx={{ my: '20px' }}>
            <Grid spacing={2} container>
                <Grid item xs={12}>
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
            </Grid>
        </Box>
    );
}

export default Home;
