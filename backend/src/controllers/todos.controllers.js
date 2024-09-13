import { database } from "../db/database.js";

export const getAllTodos = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  const todos = database.todos.filter((todo) => todo.owner === req.user.id);
  res.json({ todos });
};

export const createTodo = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Falta el título" });
  }

  const newTodo = {
    id: database.todos.length + 1,
    title,
    completed: false,
    owner: req.user.id,
  };

  database.todos.push(newTodo);
  return res.status(201).json({ todo: newTodo });
};

export const updateTodo = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = database.todos.find(
    (todo) => todo.id === parseInt(id) && todo.owner === req.user.id
  );

  if (!todo) {
    return res.status(404).json({ message: "Todo no encontrado" });
  }

  todo.title = title !== undefined ? title : todo.title;
  todo.completed = completed !== undefined ? completed : todo.completed;

  return res.status(200).json({ message: "Todo actualizado" });
};

export const deleteTodo = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const { id } = req.params;

  const todo = database.todos.find(
    (todo) => todo.id === parseInt(id) && todo.owner === req.user.id
  );

  if (!todo) {
    return res.status(404).json({ message: "Todo no encontrado" });
  }

  database.todos = database.todos.filter(
    (todo) => todo.id !== parseInt(id) || todo.owner !== req.user.id
  );

  return res.status(200).json({ message: "Todo eliminado" });
};
