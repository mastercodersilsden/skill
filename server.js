const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const TODOS_FILE = 'todos.json';

// Load todos from file
function loadTodos() {
  try {
    return JSON.parse(fs.readFileSync(TODOS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

// Save todos to file
function saveTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(loadTodos());
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const todos = loadTodos();
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
    createdAt: new Date()
  };
  todos.push(newTodo);
  saveTodos(todos);
  res.json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const todos = loadTodos();
  const todo = todos.find(t => t.id == req.params.id);
  if (todo) {
    if (req.body.text) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;
    saveTodos(todos);
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  let todos = loadTodos();
  const initialLength = todos.length;
  todos = todos.filter(t => t.id != req.params.id);
  if (todos.length < initialLength) {
    saveTodos(todos);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 To-Do App running at http://localhost:${PORT}`);
});
