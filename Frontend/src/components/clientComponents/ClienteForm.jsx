import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';

import { useClients } from '../../context/clientContext.jsx';

const clientSchema = yup.object().shape({
    fk_id_usuario: yup.number().positive().integer().required('El Id es obligatorio'),
    nombre_comercial: yup.string().required('El nombre comercial es obligatorio'),
    razon_social: yup.string().required('La razón social es obligatoria'),
    direccion: yup.string().required('La dirección es obligatoria'),
});

export default function ClienteForm() {
    const { createClient } = useClients();
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const {
        register: registerClient,
        handleSubmit: handleClientSubmit,
        formState: { errors: clientErrors },
    } = useForm({
        resolver: yupResolver(clientSchema),
    });

    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const onSubmitClient = handleClientSubmit(async (data) => {
        try {
            const res = await createClient(data);
            if (res.status !== 201) {
                showAlert('error', 'Error al guardar Cliente');
            } else {
                showAlert('success', 'Cliente guardado con éxito');
            }
        } catch (err) {
            console.error('Error: ', err);
        }
    });


    return (
        <>
            <form onSubmit={onSubmitClient}>
                <TextField
                    label="ID Usuario"
                    {...registerClient('fk_id_usuario')}
                    fullWidth
                    margin="normal"
                    error={!!clientErrors.fk_id_usuario}
                    helperText={clientErrors.fk_id_usuario?.message}
                />
                <TextField
                    label="Nombre Comercial"
                    {...registerClient('nombre_comercial')}
                    fullWidth
                    margin="normal"
                    error={!!clientErrors.nombre_comercial}
                    helperText={clientErrors.nombre_comercial?.message}
                />
                <TextField
                    label="Razón Social"
                    {...registerClient('razon_social')}
                    fullWidth
                    margin="normal"
                    error={!!clientErrors.razon_social}
                    helperText={clientErrors.razon_social?.message}
                />
                <TextField
                    label="Dirección"
                    {...registerClient('direccion')}
                    fullWidth
                    margin="normal"
                    error={!!clientErrors.direccion}
                    helperText={clientErrors.direccion?.message}
                />
                
                <Button type="submit" color="primary" fullWidth>Guardar Cliente</Button>
            </form>
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
        </>
    )
}
