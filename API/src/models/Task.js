import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    ferramenta: {
        type: String, 
        required: true,
    },
    encarregado: {
        type: String,
        required: true,
    },
    funcionario: {
        type: String,
        required: true,
    },   
    concluido: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
});

export default mongoose.model("Task", taskSchema);
