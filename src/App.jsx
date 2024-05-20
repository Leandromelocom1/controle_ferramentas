import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from './components/Todo';
import Search from './components/Search';
import Filter from './components/Filter';
import WelcomeScreen from './WelcomeScreen';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Asc');
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log("Carregando tarefas do servidor...");
    getAllTask();
  }, []);

  const getAllTask = async () => {
    try {
      console.log("Buscando tarefas...");
      const response = await axios.get("http://localhost:3000");
      console.log("Tarefas recebidas:", response.data);
      if (Array.isArray(response.data)) {
        setTodos(response.data);
      } else {
        console.error("Dados recebidos não são um array:", response.data);
        setTodos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setTodos([]);
    }
  };

  const createTask = async (taskData) => {
    const data = {
      ferramenta: taskData.ferramenta,
      encarregado: taskData.encarregado,
      concluido: taskData.concluido,
      funcionario: taskData.funcionario,
    };
    console.log("Criando tarefa com os dados:", data);
    try {
      const response = await axios.post("http://localhost:3000", data);
      console.log("Tarefa criada:", response.data);
      setTodos(prevTodos => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      if (error.response) {
        console.error("Resposta do servidor:", error.response.data);
      }
    }
  };

  const addTodo = (text, category) => {
    const newTodo = { id: Math.floor(Math.random() * 1000), text, category, isCompleted: false };
    createTask({ ferramenta: text, encarregado: category, concluido: false, funcionario: "" });
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    }));
  };

  console.log("Todos:", todos);
  console.log("Filter:", filter);
  console.log("Search:", search);
  console.log("Sort:", sort);

  return (
    <div>
      <div className="app">
        <h1>Lista de Ferramentas</h1>
        <WelcomeScreen addTodo={addTodo} />
        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
        <div className="todo-list">
          {Array.isArray(todos) && todos.length > 0
            ? todos
              .filter(todo => filter === "All" || (filter === "Completed" ? todo.isCompleted : !todo.isCompleted))
              .filter(todo => typeof todo.text === 'string' && todo.text.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
              .map((todo, index) => (
                <Todo
                  key={todo.id || index}
                  index={index}
                  todo={todo}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                />
              ))
            : <p>Nenhuma tarefa encontrada.</p>
          }
        </div>
      </div>
    </div>
  );
};

export default App;
