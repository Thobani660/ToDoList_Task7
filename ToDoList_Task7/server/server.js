const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database("./todo_list.db", (err) => {
  if (err) {
    console.error("error connecting:", err);
    return;
  }
  console.log("connected to server database");
});

// Creating the todos table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      priority TEXT NOT NULL
    );
  `);
});

app.get("/api/todos", (req, res) => {
  db.all("SELECT * FROM todos", (err, rows) => {
    if (err) {
      console.error("error running query:", err);
      res.status(500).send({ message: "Error fetching todos" });
    } else {
      res.send(rows);
    }
  });
});

app.post("/api/todos", (req, res) => {
  const { text, priority } = req.body;
  db.run(
    "INSERT INTO todos (text, priority) VALUES (?, ?)",
    [text, priority],
    (err) => {
      if (err) {
        console.error("error running query:", err);
        res.status(500).send({ message: "Error adding todo" });
      } else {
        res.send({ message: "Todo added successfully" });
      }
    }
  );
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text, priority } = req.body;
  db.run(
    "UPDATE todos SET text = ?, priority = ? WHERE id = ?",
    [text, priority, id],
    (err) => {
      if (err) {
        console.error("error running query:", err);
        res.status(500).send({ message: "Error updating todo" });
      } else {
        res.send({ message: "Todo updated successfully" });
      }
    }
  );
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("error running query:", err);
      res.status(500).send({ message: "Error deleting todo" });
    } else {
      res.send({ message: "Todo deleted successfully" });
    }
  });
});


const express = require('express');
const app = express();
const mysql = require('mysql');
const axios = require('axios');

Create a connection to the database
const dbs = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Connect to the database
dbs.connect(function(err) {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + dbs.threadId);
});

// Middleware to parse JSON requests
app.use(express.json());

// Create a new user
app.post('/sign-up', (req, res) => {
  const { name, surname, userId, email, cellphone } = req.body;
  const query = `INSERT INTO users (name, surname, userId, email, cellphone) VALUES (?, ?, ?, ?, ?)`;
  dbs.query(query, [name, surname, userId, email, cellphone], (err, results) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error creating user' });
    } else {
      console.log('Form was successfully submitted');
      res.send({ message: 'User created successfully' });
    }
  });
});

// Get all users
app.get('/users', (req, res) => {
  const query = `SELECT * FROM users`;
  dbs.query(query, (err, results) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error retrieving users' });
    } else {
      console.log('Form retrieved');
      res.send(results);
    }
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, surname, userId, email, cellphone } = req.body;
  const query = `UPDATE users SET name = ?, surname = ?, userId = ?, email = ?, cellphone = ? WHERE id = ?`;
  dbs.query(query, [name, surname, userId, email, cellphone, id], (err, results) => {
    if (err) {
      console.error('error:', err);
      res.status(500).send({ message: 'Error updating user' });
    } else {
      console.log('Form successfully updated');
      res.send({ message: 'User updated successfully' });
    }
  });
});

// Start the server
// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

app.listen(3001, () => {
  console.log("Server listening on port http://localhost:3001");
});

app.listen(3001, () => {
  console.log("Server listening on port http://localhost:3001");
});



// Create the users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    surname TEXT,
    userId TEXT,
    email TEXT,
    cellphone TEXT
  );
`);

// Handle the /users endpoint
app.post('/users', (req, res) => {
  const { name, surname, userId, email, cellphone } = req.body;
  const sql = `
    INSERT INTO users (name, surname, userId, email, cellphone)
    VALUES (?, ?, ?, ?, ?);
  `;
  const params = [name, surname, userId, email, cellphone];
  db.run(sql, params, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error creating user' });
    } else {
      res.send({ message: 'User created successfully' });
    }
  });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});