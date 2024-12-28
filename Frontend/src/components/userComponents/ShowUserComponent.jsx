import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    IconButton,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useUsers } from '../../context/userContext.jsx';
import UserUpdateFormComponent from './UserUpdateFormComponent.jsx';

export default function ShowUserComponent() {
    const { users, getAllUsers, updatedUser, activateUserById, inactivateUserById, setUsers } = useUsers();
    const [editingUser, setEditingUser] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, user: null });
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleEditUser = (user) => {
        const fullUserData = users.find((u) => u.id_usuario === user.id_usuario);
        setEditingUser(fullUserData);
    };

    const handleCloseEdit = () => {
        setEditingUser(null);
        getAllUsers();
    };

    const handleToggleStatus = (user) => {
        setConfirmDialog({ open: true, user });

    };

    const handleConfirmToggle = async () => {
        const { user } = confirmDialog;
        try {
            if (user.fk_id_estados === 1) {
                await inactivateUserById(user.id_usuario);
                setUsers((prevUsers) =>
                    prevUsers.map((u) =>
                        u.id_usuario === user.id_usuario ? { ...u, fk_id_estados: 2 } : u
                    )
                );
            } else {
                await activateUserById(user.id_usuario);
                setUsers((prevUsers) =>
                    prevUsers.map((u) =>
                        u.id_usuario === user.id_usuario ? { ...u, fk_id_estados: 1 } : u
                    )
                );
            }
            setAlert({ open: true, type: 'success', message: 'Estado actualizado con éxito' });
        } catch (err) {
            console.error(err);
            setAlert({ open: true, type: 'error', message: 'Error al actualizar el estado' });
        }
        setConfirmDialog({ open: false, user: null });
    };

    const handleCancelToggle = () => {
        setConfirmDialog({ open: false, user: null });
    };


    return (
        <>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >ID</TableCell>
                                <TableCell >Nombre</TableCell>
                                <TableCell>Correo Electrónico</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id_usuario}>
                                    <TableCell>{user.id_usuario}</TableCell>
                                    <TableCell>{user.nombre_completo}</TableCell>
                                    <TableCell>{user.correo_electronico}</TableCell>
                                    <TableCell>{user.telefono}</TableCell>
                                    <TableCell>{user.fk_id_rol === 1 ? 'Operador' : 'Cliente'}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={user.fk_id_estados === 1}
                                            onChange={() => handleToggleStatus(user)}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEditUser(user)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal para editar usuario */}
                <Dialog open={!!editingUser} onClose={handleCloseEdit} fullWidth maxWidth="sm">
                    <DialogTitle>Editar Usuario</DialogTitle>
                    <DialogContent>
                        {editingUser && (
                            <UserUpdateFormComponent
                                userData={editingUser}
                                onUpdate={updatedUser}
                                onClose={handleCloseEdit}
                            />
                        )}
                    </DialogContent>
                </Dialog>

                {/* Modal de confirmación */}
                <Dialog open={confirmDialog.open} onClose={handleCancelToggle}>
                    <DialogTitle>Confirmar acción</DialogTitle>
                    <DialogContent>
                        <Typography>
                            ¿Estás seguro de que deseas{' '}
                            {confirmDialog.user?.fk_id_estados === 1 ? 'inactivar' : 'activar'}{' '}
                            este usuario?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelToggle} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmToggle} color="primary">
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar para alertas */}
                <Snackbar
                    open={alert.open}
                    autoHideDuration={4000}
                    onClose={() => setAlert({ ...alert, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setAlert({ ...alert, open: false })}
                        severity={alert.type}
                        sx={{ width: '100%' }}
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
}
