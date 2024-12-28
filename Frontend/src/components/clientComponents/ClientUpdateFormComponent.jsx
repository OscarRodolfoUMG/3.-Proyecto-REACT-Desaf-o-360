import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Button,
    DialogActions,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Snackbar,
    Alert
} from '@mui/material';

import { useClients } from '../../context/clientContext';

const updateClientSchema = yup.object().shape({
    fk_id_usuario: yup.number().positive().integer().required('El Id es obligatorio'),
    nombre_comercial: yup.string().required('El nombre comercial es obligatorio'),
    razon_social: yup.string().required('La razón social es obligatoria'),
    direccion: yup.string().required('La dirección es obligatoria'),
});
export default function ClientUpdateFormComponent({ clientData, onUpdate, onClose }) {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: clientData || {},
        resolver: yupResolver(updateClientSchema),
    });

    const { updateClient } = useClients();
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };


    const onSubmit = async (data) => {
        try {
            const result = await updateClient(clientData.id_cliente, data);
            if (result.status !== 201) {
                showAlert('error', 'Error al actualizar Cliente');
            } else {
                showAlert('success', 'Cliente actualizado con éxito');
            }
        } catch (err) {
            console.error('Error: ', err);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}

        >
            <TextField
                label="Nombre Comercial"
                {...register('nombre_comercial')}
                fullWidth
                margin="normal"
                error={!!errors.nombre_comercial}
                helperText={errors.nombre_comercial?.message}
            />
            <TextField
                label="Razón Social"
                {...register('razon_social')}
                fullWidth
                margin="normal"
                error={!!errors.razon_social}
                helperText={errors.razon_social?.message}
            />
            <TextField
                label="Dirección"
                {...register('direccion')}
                fullWidth
                margin="normal"
                error={!!errors.direccion}
                helperText={errors.direccion?.message}
            />

            <DialogActions sx={{ justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="contained" type="submit">
                    Guardar
                </Button>
            </DialogActions>

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
