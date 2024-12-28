import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import usuariosRoutes from "./routes/user.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import categoriaProductoRoutes from "./routes/categoriaProductos.routes.js";
import estadosRoutes from "./routes/estados.routes.js";
import clientesRoutes from "./routes/clientes.routes.js";
import OrdenRoutes from "./routes/orden.routes.js";
import OrdenDetalleRoutes from "./routes/ordenDetalles.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Rutas
app.use("/api", authRoutes)
app.use("/api", usuariosRoutes)
app.use("/api", productosRoutes);
app.use("/api", categoriaProductoRoutes);
app.use("/api", estadosRoutes);
app.use("/api", clientesRoutes);
app.use("/api", OrdenRoutes);
app.use("/api", OrdenDetalleRoutes);


export default app;

