import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';


export default function PedidosPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Cargar pedidos pendientes
    const fetchPendingOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/orders/pending'); // Asegúrate de ajustar el endpoint según tu API.
        setOrders(response.data);
      } catch (err) {
        setError('Error al cargar los pedidos pendientes.');
      } finally {
        setLoading(false);
      }
    };
  
    // Validar pedido
    const validateOrder = async (orderId) => {
      try {
        await axios.post(`/api/orders/${orderId}/validate`); // Ajusta según tu API.
        fetchPendingOrders(); // Refrescar lista después de la validación.
      } catch (err) {
        alert('Error al validar el pedido.');
      }
    };
  
    useEffect(() => {
      fetchPendingOrders();
    }, []);
  
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
          <Typography color="error">{error}</Typography>
          <Button variant="contained" color="primary" onClick={fetchPendingOrders}>
            Reintentar
          </Button>
        </Box>
      );
    }
  
    return (
      <Box p={3}>
        <Typography variant="h4" gutterBottom>Pedidos Pendientes de Validación</Typography>
        {orders.length === 0 ? (
          <Typography>No hay pedidos pendientes de validar.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID Pedido</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.clientName}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>${order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => validateOrder(order.id)}
                      >
                        Validar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    );
}
