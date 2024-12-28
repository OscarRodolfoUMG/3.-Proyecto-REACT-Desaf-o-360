import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;

    if(!token) return res.status(500).json({message: "Autorizacion Denegada"});

    jwt.verify(token, TOKEN_SECRET, (error, user) =>{
        if(error) return res.status(403).json({message: "Token Invalido"});
        
        req.user;

        next();
    })
}