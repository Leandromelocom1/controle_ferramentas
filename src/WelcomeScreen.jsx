import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WelcomeScreen = () => {
  const [tool, setTool] = useState("");
  const [employee, setEmployee] = useState("");
  const [category, setCategory] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tool || !employee || !category) return;

    const newTask = { ferramenta: tool, encarregado: category, funcionario: employee };
    // Envia a nova tarefa para o backend
    axios.post('http://localhost:3000/api/tasks', newTask)
      .then((response) => {
        // Atualiza a lista de tarefas após a criação bem-sucedida
        fetchTasks();
      })
      .catch((error) => {
        console.error("Houve um erro ao criar a tarefa!", error);
      });

    // Limpa os campos do formulário
    setTool("");
    setEmployee("");
    setCategory("");
  };

  const fetchTasks = () => {
    // Busca as tarefas do backend
    axios.get('http://localhost:3000/api/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar as tarefas!", error);
      });
  };

  useEffect(() => {
    // Busca as tarefas ao montar o componente
    fetchTasks();
  }, []);

  return (
    <div className="todo-form">
      <h2>Criar tarefa:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={tool}
          placeholder="Ferramenta"
          onChange={(e) => setTool(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Selecione o Encarregado</option>
          <option value="Marcelo">Marcelo</option>
          <option value="Fabio">Fábio</option>
          <option value="Josue">Josué</option>
          <option value="Luiz_Fernando">Luiz Fernando</option>
          <option value="Adolfo">Adolfo</option>
        </select>
        <input
          type="text"
          className="input"
          value={employee}
          placeholder="Funcionário"
          onChange={(e) => setEmployee(e.target.value)}
        />
        <button type="submit">Criar tarefa</button>
      </form>

      <h2>Lista de Tarefas:</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            Ferramenta: {task.ferramenta}, Encarregado: {task.encarregado}, Funcionário: {task.funcionario}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WelcomeScreen;
