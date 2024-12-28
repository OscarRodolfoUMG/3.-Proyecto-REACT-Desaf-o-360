import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

import { useAuth } from '../context/authContext.jsx';

export default function LoginPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, login, loading, isAuthenticated } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await login(data);
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
        }
    });

    useEffect(() => {
        if (isAuthenticated) {
            switch (user.fk_id_rol) {
                case 1:
                    console.log("hola desde switc")
                    navigate("/usuarios");
                    break;
                case 2:
                    navigate("/productos");
                    break;
                default:
                    navigate("/login");
            }
        }
    }, [isAuthenticated]);

    return (

        <Box
            component="form"
            onSubmit={onSubmit}
            bgcolor="background.paper"
            p={4}
            borderRadius={2}
            boxShadow={3}
            width={{ xs: '100%', sm: 400 }}
        >
            <Typography variant="h5" textAlign="center" gutterBottom>
                Iniciar Sesión
            </Typography>

            <TextField
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
            />
            <Box mt={2}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
                </Button>
            </Box>
        </Box>
    );
}
