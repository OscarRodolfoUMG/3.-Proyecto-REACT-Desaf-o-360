import { Router } from "express";
import { activateProduct, createProduct, getAllProducts, getProductById, inactivateProduct, updateProduct } from "../controllers/productos.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/productos', authRequired, getAllProducts);
router.get('/productos/:id', authRequired, getProductById);
router.post('/productos', authRequired, createProduct);
router.put('/productos/:id', authRequired, updateProduct);

router.patch('/productos/inactivate/:id', authRequired, inactivateProduct);
router.patch('/productos/activate/:id', authRequired, activateProduct);

export default router;