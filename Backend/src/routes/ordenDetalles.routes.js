import { Router } from "express";
import { createOrdenDetalle, getAllOrdenDetalle, getOrdenDetalleById, updateOrdenDetalle } from "../controllers/ordenDetalle.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/ordenDetalle', authRequired, getAllOrdenDetalle);
router.get('/ordenDetalle/:id_orden/:id_cod', authRequired, getOrdenDetalleById);
router.post('/ordenDetalle', authRequired, createOrdenDetalle);
router.put('/ordenDetalle/:id_orden/:id_cod', authRequired, updateOrdenDetalle);

export default router;