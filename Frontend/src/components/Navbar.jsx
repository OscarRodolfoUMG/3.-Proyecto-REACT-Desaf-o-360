import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

export default function Navbar() {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Condicional para renderizar opciones según el rol
    const getNavLinks = () => {
        if (user.fk_id_rol === 1) {
            return (
                <>
                    <Button color="inherit" onClick={() => handleNavigation('/usuarios')}>Usuarios</Button>
                    <Button color="inherit" onClick={() => handleNavigation('/clientes')}>Clientes</Button>
                    <Button color="inherit" onClick={() => handleNavigation('/categorias')}>Categorias</Button>
                    <Button color="inherit" onClick={() => handleNavigation('/stock')}>Stock</Button>
                    <Button color="inherit" onClick={() => handleNavigation('/pedidos')}>Gestión de Pedidos</Button>

                </>
            );
        } else if (user.fk_id_rol === 2) {
            return (
                <>
                    <Button color="inherit" onClick={() => handleNavigation('/productos')}>Productos</Button>
                    <Button color="inherit" onClick={() => handleNavigation('/pedidos')}>Mis Pedidos</Button>
                </>
            );
        }
        return null;
    };

    if (!isAuthenticated) return null; 

    return (
        <AppBar position="fixed" sx={{ width: '100%' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Centro de Gestión {`- ${user.nombre_completo || 'Usuario'}`}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {getNavLinks()}
                    <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                </Box>
            </Toolbar>
        </AppBar>

    );
}
