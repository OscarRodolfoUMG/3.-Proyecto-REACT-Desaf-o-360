import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';

import { useUsers } from '../../context/userContext.jsx';
import ClienteForm from './ClienteForm.jsx'

const clientSchema = yup.object().shape({
    nombre_comercial: yup.string().required('El nombre comercial es obligatorio'),
    razon_social: yup.string().required('La razón social es obligatoria'),
    direccion: yup.string().required('La dirección es obligatoria'),
    telefono: yup.string().min(8, 'Debe tener 8 caracteres').max(8, 'Debe tener 8 caracteres').matches(/^[0-9]+$/, 'Solo se permiten números').required('El teléfono es obligatorio'),
});


export default function ClientFormComponent() {
    const { createUser } = useUsers();

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    // Formularios y validaciones separados


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
            <Typography variant="h4" gutterBottom>Gestión de Clientes</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Agregar Cliente
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Información Cliente</DialogTitle>
                <DialogContent>

                    <ClienteForm />

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
