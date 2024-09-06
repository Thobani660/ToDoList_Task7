const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create tasks table
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  description TEXT,
  priority TEXT
)`);

// API to get tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      tasks: rows,
    });
  });
});

// API to add a task
app.post('/tasks', (req, res) => {
  const { description, priority } = req.body;
  const sql = 'INSERT INTO tasks (description, priority) VALUES (?, ?)';
  const params = [description, priority];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      description,
      priority,
    });
  });
});

// API to delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

// API to update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { description, priority } = req.body;
  db.run(
    'UPDATE tasks SET description = ?, priority = ? WHERE id = ?',
    [description, priority, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updatedID: id });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
