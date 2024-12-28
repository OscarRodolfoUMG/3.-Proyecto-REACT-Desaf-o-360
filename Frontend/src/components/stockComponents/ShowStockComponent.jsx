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

import { useProducts } from '../../context/productContext.jsx';
import StockUpdateFormComponent from './StockUpdateFormComponent.jsx'; 

export default function ShowProductComponent() {
    const { products, getAllProducts, updateProduct, activateProductById, inactivateProductById, setProducts } = useProducts();
    const [editingProduct, setEditingProduct] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, product: null });
    const [alert, setAlert] = useState({ open: false, type: '', message: '' });

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleEditProduct = (product) => {
        const fullProductData = products.find((p) => p.id_codigo_producto === product.id_codigo_producto);
        setEditingProduct(fullProductData);
    };

    const handleCloseEdit = () => {
        setEditingProduct(null);
        getAllProducts();
    };

    const handleToggleStatus = (product) => {
        setConfirmDialog({ open: true, product });
    };

    const handleConfirmToggle = async () => {
        const { product } = confirmDialog;
        try {
            if (product.fk_id_estados === 1) {
                await inactivateProductById(product.id_codigo_producto);
                setProducts((prevProducts) =>
                    prevProducts.map((p) =>
                        p.id_codigo_producto === product.id_codigo_producto ? { ...p, fk_id_estados: 2 } : p
                    )
                );
            } else {
                await activateProductById(product.id_codigo_producto);
                setProducts((prevProducts) =>
                    prevProducts.map((p) =>
                        p.id_codigo_producto === product.id_codigo_producto ? { ...p, fk_id_estados: 1 } : p
                    )
                );
            }
            setAlert({ open: true, type: 'success', message: 'Estado actualizado con éxito' });
        } catch (err) {
            console.error(err);
            setAlert({ open: true, type: 'error', message: 'Error al actualizar el estado' });
        }
        setConfirmDialog({ open: false, product: null });
    };

    const handleCancelToggle = () => {
        setConfirmDialog({ open: false, product: null });
    };

    return (
        <>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id_codigo_producto}>
                                    <TableCell>{product.id_codigo_producto}</TableCell>
                                    <TableCell>{product.nombre}</TableCell>
                                    <TableCell>{product.marca}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>Q {product.precio.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={product.fk_id_estados === 1}
                                            onChange={() => handleToggleStatus(product)}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEditProduct(product)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal para editar producto */}
                <Dialog open={!!editingProduct} onClose={handleCloseEdit} fullWidth maxWidth="sm">
                    <DialogTitle>Editar Producto</DialogTitle>
                    <DialogContent>
                        {editingProduct && (
                            <StockUpdateFormComponent
                                productData={editingProduct}
                                onUpdate={updateProduct}
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
                            {confirmDialog.product?.fk_id_estados === 1 ? 'inactivar' : 'activar'}{' '}
                            este producto?
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
            </Box>
        </>
    );
}
