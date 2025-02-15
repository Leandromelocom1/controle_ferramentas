import userRepositories from "../repositories/userRepositories.js";
import userSchema from "../models/User.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;

    try {
        const newUser = new userSchema(req.body);
        const saveUser = await newUser.save();
        res.status(201).json({
            statusCode: 201,
            message: "Criado com Sucesso",
            data: { saveUser }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await userRepositories.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function updateUser(req, res) {
    try {
        const user = await userRepositories.updateById(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message    
        });
    }
}

export async function deleteUser(req, res) {
    try {
        const deleteUser = await userRepositories.deleteById(req.params.id);
        res.status(200).json(deleteUser);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function authRoute(req, res) {
    res.status(200).json({
        statusCode: 200, 
        message: "rotaok"
    });
}
