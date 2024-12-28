import { Router } from "express";
import { loginUser, logoutUser, verifyToken } from "../controllers/auth.controller.js";

const router = Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/verify', verifyToken);


export default router;