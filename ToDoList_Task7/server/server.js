const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');

// Register a new user
app.post('/register', async (req, res) => {
  const { username, surname, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO Users (username, surname, email, password) VALUES (?, ?, ?, ?)',
    [username, surname, email, hashedPassword],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, username, surname, email });
    }
  );
});


// Database setup
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS Todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            priority TEXT NOT NULL
          )`,
      (err) => {
        if (err) {
          console.error('Error creating table ' + err.message);
        }
      }
    );
  }
});

// Get all todos
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM Todos', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { text, priority } = req.body;
  if (!text || !priority) {
    return res.status(400).json({ error: 'Text and priority are required' });
  }

  db.run(
    'INSERT INTO Todos (text, priority) VALUES (?, ?)',
    [text, priority],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, text, priority });
    }
  );
});

// Update an existing todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, priority } = req.body;

  db.run(
    'UPDATE Todos SET text = ?, priority = ? WHERE id = ?',
    [text, priority, id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id, text, priority });
    }
  );
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Todos WHERE id = ?', id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: `Todo with ID ${id} deleted` });
  });
});



// login
// Login user
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get('SELECT * FROM Users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Compare hashed passwords
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(400).json({ error: 'Invalid password' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
