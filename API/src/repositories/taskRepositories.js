import Task from "../models/Task.js";

class TaskRepository {
    async create(taskData) {
        const task = new Task(taskData);
        await task.save();
        return task;
    }
    async findAll() {
        return Task.find();
    }
    async updateById(id, taskData) {
        return Task.findByIdAndUpdate(id, taskData, { new: true });
    }
    async deleteById(id) {
        return Task.findByIdAndDelete(id);
    }
}

const taskRepositories = new TaskRepository();
export default taskRepositories;
