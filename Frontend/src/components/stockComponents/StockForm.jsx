import React, { useState, useEffect } from 'react';
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

import { useProducts } from '../../context/productContext.jsx';
import { useAuth } from '../../context/authContext.jsx';
import { useCategories } from '../../context/categoryContext';

const productSchema = yup.object().shape({
    nombre: yup.string().required('El nombre del producto es obligatorio'),
    marca: yup.string().required('La marca es obligatoria'),
    stock: yup.number()
        .typeError('El stock debe ser un número')
        .positive('El stock debe ser positivo')
        .required('El stock es obligatorio'),
    precio: yup.number()
        .typeError('El precio debe ser un número')
        .positive('El precio debe ser positivo')
        .required('El precio es obligatorio'),
    fk_id_categoriaProducto: yup.number().required('La categoria es obligatoria'),
    fk_id_usuario: yup.string().required('El usuario es obligatorio'),
    fk_id_estado: yup.string().oneOf(['1', '2'], 'El estado debe ser Activo o Inactivo').required('El estado es obligatorio'),
    foto: yup.string().oneOf(['1', '0'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
});

export default function ProductoForm() {
    const { user } = useAuth();
    const { createProduct } = useProducts();
    const { categories, getAllCategories } = useCategories();
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const {
        register: registerProduct,
        handleSubmit: handleProductSubmit,
        formState: { errors: productErrors },
    } = useForm({
        resolver: yupResolver(productSchema),
    });

    useEffect(() => {
        getAllCategories();
    }, []);

    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const onSubmitProduct = handleProductSubmit(async (data) => {
        try {
            const result = await createProduct(data);
            if (result.status !== 201) {
                showAlert('error', 'Error al guardar el producto');
            } else {
                showAlert('success', 'Producto guardado con éxito');
            }
        } catch (err) {
            console.error('Error: ', err);
            showAlert('error', 'Error al guardar el producto');
        }
    });


    return (
        <>
            <form onSubmit={onSubmitProduct}>
                <TextField
                    label="Nombre del Producto"
                    {...registerProduct('nombre')}
                    fullWidth
                    margin="normal"
                    error={!!productErrors.nombre}
                    helperText={productErrors.nombre?.message}
                />
                <TextField
                    label="Marca"
                    {...registerProduct('marca')}
                    fullWidth
                    margin="normal"
                    error={!!productErrors.marca}
                    helperText={productErrors.marca?.message}
                />
                <TextField
                    label="Stock"
                    type="number"
                    {...registerProduct('stock')}
                    fullWidth
                    margin="normal"
                    error={!!productErrors.stock}
                    helperText={productErrors.stock?.message}
                />
                <TextField
                    label="Precio"
                    type="float"
                    {...registerProduct('precio')}
                    fullWidth
                    margin="normal"
                    error={!!productErrors.precio}
                    helperText={productErrors.precio?.message}
                />
               
                <FormControl fullWidth margin="normal">
                    <InputLabel id="categoria-label">Categoría</InputLabel>
                    <Select
                        labelId="categoria-label"
                        defaultValue=""
                        {...registerProduct('fk_id_categoriaProducto')}
                        error={!!productErrors.fk_id_categoriaProducto}
                    >
                        {
                            categories.map((category) => (
                                <MenuItem key={category.id_categoriaProductos} value={category.id_categoriaProductos}>
                                    {category.nombre}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <Typography variant="caption" color="error">
                        {productErrors.fk_id_categoriaProducto?.message}
                    </Typography>
                </FormControl>

                <input
                    label="fk_id_usuario"
                    type="hidden"
                    value={user.id || ""}
                    {...registerProduct('fk_id_usuario')}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Estado</InputLabel>
                    <Select
                        labelId="status-label"
                        defaultValue="1"
                        {...registerProduct('fk_id_estado')}
                        error={!!productErrors.fk_id_estado}
                    >
                        <MenuItem value="1">Activo</MenuItem>
                        <MenuItem value="2">Inactivo</MenuItem>
                    </Select>
                    <Typography color="error" variant="caption">{productErrors.fk_id_estado?.message}</Typography>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="foto-label">¿Tiene Foto?</InputLabel>
                    <Select
                        labelId="foto-label"
                        {...registerProduct('foto')}
                        defaultValue="" // Valor predeterminado, ajústalo si necesitas
                        error={!!productErrors.foto}
                    >
                        <MenuItem value="1">Sí</MenuItem>
                        <MenuItem value="0">No</MenuItem>
                    </Select>
                    <Typography variant="caption" color="error">
                        {productErrors.foto?.message}
                    </Typography>
                </FormControl>
                <Button type="submit" color="primary" fullWidth>Guardar Producto</Button>
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
