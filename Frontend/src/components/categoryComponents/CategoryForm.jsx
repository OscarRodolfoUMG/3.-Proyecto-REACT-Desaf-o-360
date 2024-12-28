import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { useCategories } from '../../context/categoryContext';

const categorySchema = yup.object().shape({
    nombre: yup.string().required('El nombre es obligatorio').max(50, 'Máximo 50 caracteres'),
    fk_id_estados: yup.string().oneOf(['1', '2'], 'El estado debe ser Activo o Inactivo').required('El estado es obligatorio'),
});

export default function CategoryFormComponent() {
    const { createCategory } = useCategories();
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(categorySchema),
    });

    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            const result = await createCategory(data);
            if (result.status === 201) {
                showAlert('success', 'Categoría creada con éxito');
            } else {
                showAlert('error', 'Error al crear la categoría');
            }
        } catch (err) {
            console.error(err);
            showAlert('error', 'Error al crear la categoría');
        }
    });

    return (
        <>
            <form onSubmit={onSubmit}>
                <TextField
                    label="Nombre de la Categoría"
                    {...register('nombre')}
                    fullWidth
                    margin="normal"
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Estado</InputLabel>
                    <Select
                        labelId="status-label"
                        defaultValue="1"
                        {...register('fk_id_estados')}
                        error={!!errors.fk_id_estados}
                    >
                        <MenuItem value="1">Activo</MenuItem>
                        <MenuItem value="2">Inactivo</MenuItem>
                    </Select>
                    <Typography color="error" variant="caption">{errors.fk_id_estados?.message}</Typography>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Crear Categoría
                </Button>
            </form>
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseAlert} severity={alert.type}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
}
