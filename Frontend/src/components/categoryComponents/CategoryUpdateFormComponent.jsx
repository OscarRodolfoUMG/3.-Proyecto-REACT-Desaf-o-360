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

import { useCategories } from '../../context/categoryContext';

const categorySchema = yup.object().shape({
    nombre: yup.string().required('El nombre es obligatorio').max(50, 'Máximo 50 caracteres'),
    fk_id_estados: yup.string().required('El estado es obligatorio'),
});

export default function CategoryUpdateFormComponent({ categoryData, onUpdate, onClose }) {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: categoryData || {},
        resolver: yupResolver(categorySchema),
    });

    const { updateCategory } = useCategories();
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };


    const onSubmit = async (data) => {
        try {
        console.log("Dato: ", categoryData.id_categoriaProductos, data)
            const result = await updateCategory(categoryData.id_categoriaProductos, data);
            if (result.status !== 200) {
                showAlert('error', 'Error al guardar el Categoria');
            } else {
                showAlert('success', 'Categoria guardado con éxito');
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
                label="Nombre de la Categoría"
                {...register('nombre')}
                fullWidth
                margin="normal"
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="fk_id_estados-label">Estado</InputLabel>
                <Select
                    labelId="fk_id_estados-label"
                    defaultValue={categoryData.fk_id_estados || ""}
                    {...register('fk_id_estados')}
                    error={!!errors.fk_id_estados}
                >
                    <MenuItem value="1">Activo</MenuItem>
                    <MenuItem value="2">Inactivo</MenuItem>
                </Select>
                <Typography color="error" variant="caption">{errors.fk_id_estados?.message}</Typography>
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
