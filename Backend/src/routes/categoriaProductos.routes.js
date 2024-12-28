import { Router } from "express";
import { activateCategoriaProducto, createCategoriaProducto, getAllCategoriaProductos, getCategoriaProductosById, inactivateCategoriaProducto, updateCategoriaProducto } from "../controllers/categoriaProductos.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/categoriaProductos', authRequired, getAllCategoriaProductos);
router.get('/categoriaProductos/:id', authRequired, getCategoriaProductosById);
router.post('/categoriaProductos', authRequired, createCategoriaProducto);
router.put('/categoriaProductos/:id', authRequired, updateCategoriaProducto);

router.patch('/categoriaProductos/inactivate/:id', authRequired, inactivateCategoriaProducto);
router.patch('/categoriaProductos/activate/:id', authRequired, activateCategoriaProducto);

export default router;