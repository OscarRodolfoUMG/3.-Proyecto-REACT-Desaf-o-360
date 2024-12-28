import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/login');
    };

    return (

        <Container
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                width: { xs: '80%', sm: '60%', md: '40%' },
            }}
        >
            <Typography variant="h1" align="center" sx={{
                fontSize: { xs: 40, sm: 45, md: 50 },
                backgroundColor: 'orange',
                color: 'white',
                borderRadius: 2,
                padding: 2,
                marginBottom: 4,

            }}>
                Mi Tiendita Online
            </Typography>


            <Button
                variant="contained"
                color="primary"
                fullWidth
                fontSize="5"
                onClick={handleNavigate}
            >
                Iniciar sesión
            </Button>
        </Container>

    );

};
