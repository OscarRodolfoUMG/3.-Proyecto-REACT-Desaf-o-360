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

import { useUsers } from '../../context/userContext.jsx';

const operatorSchema = yup.object().shape({
    correo_electronico: yup.string().email('Correo inválido').required('El correo es obligatorio'),
    nombre_completo: yup.string().required('El nombre completo es obligatorio'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    telefono: yup.string().min(8, 'Debe tener 8 caracteres').max(8, 'Debe tener 8 caracteres').matches(/^[0-9]+$/, 'Solo se permiten números').required('El teléfono es obligatorio'),
    fecha_nacimiento: yup.date().required('La fecha de nacimiento es obligatoria')
        .test(
            'is-18',
            'Debes tener al menos 18 años',
            (value) => {
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();
                const dayDifference = today.getDate() - birthDate.getDate();
                return (
                    age > 18 || (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))
                );
            }
        ),
    fk_id_rol: yup.string().required('El rol es obligatorio'),
    fk_id_estados: yup.string().oneOf(['1', '2'], 'El estado debe ser Activo o Inactivo').required('El estado es obligatorio'),
});

export default function OperadorForm() {
    const { createUser } = useUsers();
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    const {
        register: registerOperator,
        handleSubmit: handleOperatorSubmit,
        formState: { errors: operatorErrors },
    } = useForm({
        resolver: yupResolver(operatorSchema),
    });


    const showAlert = (type, message) => {
        setAlert({ open: true, type, message });
    };
    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };


    const onSubmitOperator = handleOperatorSubmit(async (data) => {
        try {
            const result = await createUser(data);
            if (result.status !== 201) {
                showAlert('error', 'Error al guardar el operador');
            } else {
                showAlert('success', 'Operador guardado con éxito');
            }
        } catch (err) {
            console.error('Error: ', err);

        }
    });


    return (
        <>
            <form onSubmit={onSubmitOperator}>
                <TextField
                    label="Correo Electrónico"
                    {...registerOperator('correo_electronico')}
                    fullWidth
                    margin="normal"
                    error={!!operatorErrors.correo_electronico}
                    helperText={operatorErrors.correo_electronico?.message}
                />
                <TextField
                    label="Nombre Completo"
                    {...registerOperator('nombre_completo')}
                    fullWidth
                    margin="normal"
                    error={!!operatorErrors.nombre_completo}
                    helperText={operatorErrors.nombre_completo?.message}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    {...registerOperator('password')}
                    fullWidth
                    margin="normal"
                    error={!!operatorErrors.password}
                    helperText={operatorErrors.password?.message}
                />
                <TextField
                    label="Teléfono"
                    {...registerOperator('telefono')}
                    fullWidth
                    margin="normal"
                    error={!!operatorErrors.telefono}
                    helperText={operatorErrors.telefono?.message}
                />
                <TextField
                    label="Fecha de Nacimiento"
                    type="date"
                    {...registerOperator('fecha_nacimiento')}
                    fullWidth
                    margin="normal"
                    error={!!operatorErrors.fecha_nacimiento}
                    helperText={operatorErrors.fecha_nacimiento?.message}
                    InputLabelProps={{ shrink: true }}
                />
                <input
                    label="fk_id_rol"
                    type="hidden"
                    value="1"
                    {...registerOperator('fk_id_rol')}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Estado</InputLabel>
                    <Select
                        labelId="status-label"
                        defaultValue="1"
                        {...registerOperator('fk_id_estados')}
                        error={!!operatorErrors.fk_id_estados}
                    >
                        <MenuItem value="1">Activo</MenuItem>
                        <MenuItem value="2">Inactivo</MenuItem>
                    </Select>
                    <Typography color="error" variant="caption">{operatorErrors.fk_id_estados?.message}</Typography>
                </FormControl>
                <Button type="submit" color="primary" fullWidth>Guardar Operador</Button>
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
