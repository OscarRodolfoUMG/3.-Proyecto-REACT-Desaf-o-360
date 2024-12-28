import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';

import { useProducts } from '../../context/productContext.jsx';
import StockForm from './StockForm.jsx'

export default function ProductFormComponent() {

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Stock de Productos</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Agregar Producto
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Agregar Producto</DialogTitle>
                <DialogContent>

                    <StockForm />

                    <Button onClick={handleClose} color="secondary" fullWidth>Cancelar</Button>
                </DialogContent>
            </Dialog>

            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
