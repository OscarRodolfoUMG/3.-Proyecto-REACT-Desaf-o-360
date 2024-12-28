import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';


import CategoryForm from './CategoryForm.jsx'

export default function CategoryFormComponent() {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: '', message: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const showAlert = (type, message) => {
    setAlert({ open: true, type, message });
  };
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>Categorias</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Crear Categoria
        </Button>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Crear Categoria</DialogTitle>
          <DialogContent>

            <CategoryForm />

            <Button onClick={handleClose} color="secondary" fullWidth>Cancelar</Button>
          </DialogContent>
        </Dialog>

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
    </>
  );
}
