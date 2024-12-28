import { Router } from "express";
import { getAllUsers, getOneUserByEmail, createtUser, inactivateUser, updateUser, activateUser } from "../controllers/user.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/users', authRequired, getAllUsers);
router.get('/users/email/:email', authRequired, getOneUserByEmail);
router.post('/users', authRequired, createtUser);
router.put('/users/:id', authRequired, updateUser);

router.patch('/users/inactivate/:id', authRequired, inactivateUser);
router.patch('/users/activate/:id', authRequired, activateUser);

export default router;