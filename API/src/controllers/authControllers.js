import userSchema from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

export async function login(req, res) {
    try {
        const user = await userSchema.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                message: "Não foi encontrado!",
                data: { email: req.body.email }
            });
        }
        const validarPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validarPassword) {
            return res.status(401).json({
                statusCode: 401,
                message: "Senha inválida"
            });
        }
        const token = jwt.sign({ name: user.name }, SECRET, { expiresIn: 5 * 60 });
        res.status(200).json({
            statusCode: 200,
            message: "Login com sucesso",
            data: { token }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

export async function verificarToken(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    const [bearer, token] = tokenHeader && tokenHeader.split(" ");
    if (!token) {
        return res.status(401).json({
            statusCode: 401, 
            message: "Token não fornecido"
        });
    }
    try {
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Token inválido"
        });
    }
}
