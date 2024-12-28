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

import { useUsers } from '../../context/userContext';

const updateUserSchema = yup.object().shape({
    nombre_completo: yup.string().required('El nombre completo es obligatorio'),
    correo_electronico: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
    telefono: yup
        .string()
        .min(8, 'Debe tener 8 caracteres')
        .max(8, 'Debe tener 8 caracteres')
        .matches(/^[0-9]+$/, 'Solo se permiten números')
        .required('El teléfono es obligatorio'),
    password: yup
        .string()
        .min(6, 'Debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    fecha_nacimiento: yup
        .date()
        .typeError('Fecha inválida')
        .required('La fecha de nacimiento es obligatoria'),
    fk_id_rol: yup.string().required('El rol es obligatorio'),
    fk_id_estados: yup.string().required('El estado es obligatorio'),
});

export default function UserUpdateFormComponent({ userData, onUpdate, onClose }) {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: userData || {},
        resolver: yupResolver(updateUserSchema),
    });

    const { updateUser } = useUsers();
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };


    const onSubmit = async (data) => {
        try {
            const result = await updateUser(userData.id_usuario, data);
            if (result.status !== 200) {
                showAlert('error', 'Error al guardar el operador');
            } else {
                showAlert('success', 'Operador guardado con éxito');
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
                label="Nombre Completo"
                {...register('nombre_completo')}
                fullWidth
                margin="normal"
                error={!!errors.nombre_completo}
                helperText={errors.nombre_completo?.message}
            />

            <TextField
                label="Correo Electrónico"
                {...register('correo_electronico')}
                fullWidth
                margin="normal"
                error={!!errors.correo_electronico}
                helperText={errors.correo_electronico?.message}
            />

            <TextField
                label="Teléfono"
                {...register('telefono')}
                fullWidth
                margin="normal"
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
            />

            <TextField
                label="Contraseña"
                type="password"
                {...register('password')}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <TextField
                label="Fecha de Nacimiento"
                type="date"
                {...register('fecha_nacimiento')}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!errors.fecha_nacimiento}
                helperText={errors.fecha_nacimiento?.message}
            />

            <FormControl fullWidth margin="normal">
                <InputLabel id="fk_id_rol-label">Rol</InputLabel>
                <Select
                    labelId="fk_id_rol-label"
                    {...register('fk_id_rol')}
                    defaultValue={userData.fk_id_rol || ""}
                    error={!!errors.fk_id_rol}
                >
                    <MenuItem value="1">Operador</MenuItem>
                    <MenuItem value="2">Cliente</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {errors.fk_id_rol?.message}
                </Typography>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="fk_id_estados-label">Estado</InputLabel>
                <Select
                    labelId="fk_id_estados-label"
                    {...register('fk_id_estados')}
                    defaultValue={userData.fk_id_estados || ""}
                    error={!!errors.fk_id_estados}
                >
                    <MenuItem value="1">Activo</MenuItem>
                    <MenuItem value="2">Inactivo</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {errors.fk_id_estados?.message}
                </Typography>
            </FormControl>

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
