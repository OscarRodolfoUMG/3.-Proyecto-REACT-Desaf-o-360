import { Router } from "express";
import { createEstados, getAllEstados, getEstadoById, updateEstado } from "../controllers/estados.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/estados',  authRequired, getAllEstados);
router.get('/estados/:id', authRequired, getEstadoById);
router.post('/estados', authRequired, createEstados);
router.put('/estados/:id', authRequired, updateEstado);


export default router;