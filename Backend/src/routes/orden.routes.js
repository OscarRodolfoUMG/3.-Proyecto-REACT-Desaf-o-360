import { Router } from "express";
import { createOrden, getAllOrden, getOrdenById, updateOrden, createOrden_detalles } from "../controllers/orden.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/orden', authRequired, getAllOrden);
router.get('/orden/:id', authRequired, getOrdenById);
router.post('/orden', authRequired, createOrden);
router.post('/orden_detalles', authRequired, createOrden_detalles);
router.put('/orden/:id', authRequired, updateOrden);

export default router;