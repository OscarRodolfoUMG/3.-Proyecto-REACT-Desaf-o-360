import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';

//Context
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import { ClientProvider } from "./context/clientContext.jsx";
import { CategoryProvider } from "./context/categoryContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";

//Paginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import ClientsPage from "./pages/ClientsPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import StockPage from "./pages/StockPage.jsx";
import ProductsPage from "./pages/ProductsPage";
import PedidosPage from "./pages/PedidosPage.jsx";


//Routes
import ProtectedRoute from "./components/ProtectedRoute";

//Navbar
import Navbar from "./components/Navbar.jsx"

function App() {

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <ClientProvider>
            <CategoryProvider>
              <ProductProvider>
                <Box
                  sx={{
                    backgroundImage: 'linear-gradient(to bottom, #F7DC6F, #f39c12)',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <BrowserRouter>
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/login" element={<LoginPage />} />

                      <Route element={<ProtectedRoute />} >

                        <Route path="/usuarios" element={<UsersPage />} />
                        <Route path="/clientes" element={<ClientsPage />} />
                        <Route path="/pedidos" element={<PedidosPage />} />
                        <Route path="/categorias" element={<CategoryPage />} />
                        <Route path="/stock" element={<StockPage />} />

                        <Route path="/productos" element={<ProductsPage />} />

                      </Route>
                    </Routes>
                  </BrowserRouter>
                </Box>
              </ProductProvider>
            </CategoryProvider>
          </ClientProvider>
        </UserProvider>
      </AuthProvider>
    </>
  )
}

export default App
