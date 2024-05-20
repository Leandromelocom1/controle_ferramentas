import taskRepositories from "../repositories/taskRepositories.js";
import taskSchema from "../models/Task.js";

export async function createTask(req, res) {
    try {
        const newTask = new taskSchema(req.body);
        const saveTask = await newTask.save();
        res.status(201).json({
            statusCode: 201,
            message: "Criado com Sucesso",
            data: { saveTask }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

export async function getAllTask(req, res) {
    try {
        const task = await taskRepositories.findAll();
        console.log(task)
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function updateTask(req, res) {
    try {
        const task = await taskRepositories.updateById(req.params.id, req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({
            message: error.message    
        });
    }
}

export async function deleteTask(req, res) {
    try {
        const deleteTask = await taskRepositories.deleteById(req.params.id);
        res.status(200).json(deleteTask);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export async function getTaskById(req, res) {
    try {
        const task = await taskRepositories.findById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
