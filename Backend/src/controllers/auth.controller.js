
import bcrypt from "bcryptjs";

import User from "../models/usuarios.model.js";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Debe ingresar usuario y contraseña" });
        }

        const userFound = await User.findOne({ where: { correo_electronico: email, fk_id_estados: 1 } });

        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" })
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = await createAccessToken({ id: userFound.id_usuario })
        
        res.cookie("token", token);

        res.status(200).json({ message: "Inicio de sesión exitoso", user: userFound.nombre_completo, fk_id_rol: userFound.fk_id_rol });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener usuarios', error: error });
    }
}

export const logoutUser = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}


export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No Autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No Autorizado" });
        try {
            const userFound = await User.findOne({ where: { id_usuario: user.id } });

            if (!userFound) {
                return res.status(400).json({ message: "No Autorizado" })
            }

            return res.json({
                id: userFound.id_usuario,
                nombre_completo: userFound.nombre_completo,
                email: userFound.email,
                fk_id_rol: userFound.fk_id_rol,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    });
};