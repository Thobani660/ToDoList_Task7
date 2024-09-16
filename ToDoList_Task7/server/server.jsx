import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database
});

// Initialize database and create table if not exists
async function initDb() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      priority TEXT NOT NULL
    )
  `);
}

initDb();

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const db = await dbPromise;
    const tasks = await db.all('SELECT * FROM tasks');
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/tasks', async (req, res) => {
  const { description, priority } = req.body;
  try {
    const db = await dbPromise;
    const result = await db.run(
      'INSERT INTO tasks (description, priority) VALUES (?, ?)',
      [description, priority]
    );
    const newTask = { id: result.lastID, description, priority };
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { description, priority } = req.body;
  try {
    const db = await dbPromise;
    const result = await db.run(
      'UPDATE tasks SET description = ?, priority = ? WHERE id = ?',
      [description, priority, id]
    );
    if (result.changes === 0) {
      return res.status(404).send('Task Not Found');
    }
    const updatedTask = { id, description, priority };
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await dbPromise;
    const result = await db.run('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.changes === 0) {
      return res.status(404).send('Task Not Found');
    }
    res.send('Task Deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
