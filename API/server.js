import express from "express";
import taskRoutes from "./src/routes/taskRoutes.js"

const app = express();

app.use(express.json()); // para processar JSON
app.use("/tasks", taskRoutes); // configurando a rota base para tarefas

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/tasks`);
});
