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

import OperadorForm from './OperadorForm.jsx'

export default function UserFormComponent() {

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
            <Typography variant="h4" gutterBottom>Gestión de Usuarios</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Crear Usuario
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Crear Usuario</DialogTitle>
                <DialogContent>

                    <OperadorForm />

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
