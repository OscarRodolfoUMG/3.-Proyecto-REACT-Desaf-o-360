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

import { useProducts } from '../../context/productContext';
import { useCategories } from '../../context/categoryContext';

const updateProductSchema = yup.object().shape({
    nombre: yup.string().required('El nombre del producto es obligatorio'),
    marca: yup.string().required('La marca es obligatoria'),
    precio: yup
        .number()
        .typeError('Debe ser un número')
        .positive('El precio debe ser positivo')
        .required('El precio es obligatorio'),
    stock: yup
        .number()
        .typeError('Debe ser un número')
        .integer('El stock debe ser un número entero')
        .min(0, 'El stock no puede ser negativo')
        .required('El stock es obligatorio'),
    fk_id_categoriaProductos: yup.number().required('La categoria es obligatoria'),
    fk_id_usuario: yup.string().required('El usuario es obligatorio'),
    fk_id_estados: yup.string().oneOf(['1', '2'], 'El estado debe ser Activo o Inactivo').required('El estado es obligatorio'),
    foto: yup.string().oneOf(['1', '0'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
});

export default function StockUpdateFormComponent({ productData, onUpdate, onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: productData || {},
        resolver: yupResolver(updateProductSchema),
    });
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const { categories, getAllCategories } = useCategories();
    const { updateProduct } = useProducts();

    useEffect(() => {
        getAllCategories();
    }, []);

    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const onSubmit = async (data) => {
        try {
            const result = await updateProduct(productData.id_codigo_producto, data);
            if (result.status !== 200) {
                showAlert('error', 'Error al guardar el producto');
            } else {
                showAlert('success', 'Producto guardado con éxito');
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
                label="Nombre del Producto"
                {...register('nombre')}
                fullWidth
                margin="normal"
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
            />

            <TextField
                label="Marca"
                {...register('marca')}
                fullWidth
                margin="normal"
                error={!!errors.marca}
                helperText={errors.marca?.message}
            />

            <TextField
                label="Precio"
                type="number"
                {...register('precio')}
                fullWidth
                margin="normal"
                error={!!errors.precio}
                helperText={errors.precio?.message}
            />

            <TextField
                label="Stock"
                type="number"
                {...register('stock')}
                fullWidth
                margin="normal"
                error={!!errors.stock}
                helperText={errors.stock?.message}
            />

            <FormControl fullWidth margin="normal">
                <InputLabel id="fk_id_categoriaProducto">Categoría</InputLabel>
                <Select
                    labelId="fk_id_categoriaProducto"
                    {...register('fk_id_categoriaProductos')}
                    defaultValue={productData.fk_id_categoriaProductos || ""}
                    error={!!errors.fk_id_categoriaProductos}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id_categoriaProductos} value={category.id_categoriaProductos}>
                            {category.nombre}
                        </MenuItem>
                    ))}
                </Select>
                <Typography variant="caption" color="error">
                    {errors.fk_id_categoriaProductos?.message}
                </Typography>
            </FormControl>

            <input
                label="fk_id_usuario"
                type="hidden"
                value={productData.fk_id_usuario}
                {...register('fk_id_usuario')}
            />

            <FormControl fullWidth margin="normal">
                <InputLabel id="fk_id_estados-label">Estado</InputLabel>
                <Select
                    labelId="fk_id_estados-label"
                    {...register('fk_id_estados')}
                    defaultValue={productData.fk_id_estados || ""}
                    error={!!errors.fk_id_estados}
                >
                    <MenuItem value="1">Activo</MenuItem>
                    <MenuItem value="2">Inactivo</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {errors.fk_id_estados?.message}
                </Typography>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="foto-label">¿Tiene Foto?</InputLabel>
                <Select
                    labelId="foto-label"
                    {...register('foto')}
                    defaultValue={productData.foto?.toString() || ""}
                    error={!!errors.foto}
                >
                    <MenuItem value="1">Sí</MenuItem>
                    <MenuItem value="0">No</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                    {errors.foto?.message}
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
