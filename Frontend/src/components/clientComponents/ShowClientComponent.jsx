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

import { useClients } from '../../context/clientContext.jsx';
import ClientUpdateFormComponent from './ClientUpdateFormComponent.jsx';

export default function ShowClientComponent() {
    const { clients, setClients, updateClient, getAllClientsUser } = useClients();
    const [editingClient, setEditingClient] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, client: null });
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });


    useEffect(() => {
        getAllClientsUser();
    }, []);

    const handleEditClient = (client) => {
        const fullClientData = clients.find((c) => c.id_cliente === client.id_cliente);
        setEditingClient(fullClientData);
    };

    const handleCloseEdit = () => {
        setEditingClient(null);
        getAllClientsUser();
    };

    return (
        <>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >ID Cliente</TableCell>
                                <TableCell >ID Usuario</TableCell>
                                <TableCell >Nombre Comercial</TableCell>
                                <TableCell >Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id_cliente}>
                                    <TableCell>{client.id_cliente}</TableCell>
                                    <TableCell>{client.fk_id_usuario}</TableCell>
                                    <TableCell>{client.nombre_comercial}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                color: client.fk_id_estados === 1 ? 'green' : 'red',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {client.fk_id_estados === 1 ? 'Activo' : 'Inactivo'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEditClient(client)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal para editar usuario */}
                <Dialog open={!!editingClient} onClose={handleCloseEdit} fullWidth maxWidth="sm">
                    <DialogTitle>Editar Cliente</DialogTitle>
                    <DialogContent>
                        {editingClient && (
                            <ClientUpdateFormComponent
                                clientData={editingClient}
                                onUpdate={updateClient}
                                onClose={handleCloseEdit}
                            />
                        )}
                    </DialogContent>
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
