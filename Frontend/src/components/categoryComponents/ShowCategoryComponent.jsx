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

import { useCategories } from '../../context/categoryContext';
import CategoryUpdateFormComponent from './CategoryUpdateFormComponent'

export default function ShowCategoryComponent() {
    const { categories, getAllCategories, updatedCategory, activateCategoryById, inactivateCategoryById, setCategories } = useCategories();
    const [editingCategory, setEditingCategory] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, category: null });
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleEditCategory = (category) => {
        const fullCategoryData = categories.find((c) => c.id_categoriaProductos === category.id_categoriaProductos);
        setEditingCategory(fullCategoryData);
    };

    const handleCloseEdit = () => {
        setEditingCategory(null);
        getAllCategories();
    };

    const handleToggleStatus = (category) => {
        setConfirmDialog({ open: true, category });

    };

    const handleConfirmToggle = async () => {
        const { category } = confirmDialog;
        try {
            if (category.fk_id_estados === 1) {
                await inactivateCategoryById(category.id_categoriaProductos);
                setCategories((prevCategories) =>
                    prevCategories.map((c) =>
                        c.id_categoriaProductos === category.id_categoriaProductos ? { ...c, fk_id_estados: 2 } : c
                    )
                );
            } else {
                await activateCategoryById(category.id_categoriaProductos);
                setCategories((prevCategories) =>
                    prevCategories.map((c) =>
                        c.id_categoriaProductos === category.id_categoriaProductos ? { ...c, fk_id_estados: 1 } : c
                    )
                );
            }
            setAlert({ open: true, type: 'success', message: 'Estado actualizado con éxito' });
        } catch (err) {
            console.error(err);
            setAlert({ open: true, type: 'error', message: 'Error al actualizar el estado' });
        }
        setConfirmDialog({ open: false, category: null });
    };

    const handleCancelToggle = () => {
        setConfirmDialog({ open: false, category: null });
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha de Creación</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id_categoriaProductos}>
                                <TableCell>{category.id_categoriaProductos}</TableCell>
                                <TableCell>{category.nombre}</TableCell>
                                <TableCell>{new Date(category.fecha_creacion).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={category.fk_id_estados === 1}
                                        onChange={() => handleToggleStatus(category)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEditCategory(category)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={!!editingCategory} onClose={handleCloseEdit} fullWidth maxWidth="sm">
                <DialogTitle>Editar Categoria</DialogTitle>
                <DialogContent>
                    {editingCategory && (
                        <CategoryUpdateFormComponent
                            categoryData={editingCategory}
                            onUpdate={updatedCategory}
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
                        {confirmDialog.category?.fk_id_estados === 1 ? 'inactivar' : 'activar'}{' '}
                        esta Categoria?
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
        </>
    );
}
