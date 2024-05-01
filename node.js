const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'support_ticketing'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.get('/', (req, res) => {
  res.send('Welcome to the AI-powered Support Ticketing System');
});

app.post('/tickets', (req, res) => {
  const { title, description, category, urgency, status } = req.body;
  const query = 'INSERT INTO tickets (title, description, category, urgency, status) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description, category, urgency, status], (err, result) => {
    if (err) throw err;
    res.send('Ticket created successfully');
  });
});

app.get('/tickets', (req, res) => {
  const query = 'SELECT * FROM tickets';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put('/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, category, urgency, status } = req.body;
  const query = 'UPDATE tickets SET title=?, description=?, category=?, urgency=?, status=? WHERE id=?';
  db.query(query, [title, description, category, urgency, status, id], (err, result) => {
    if (err) throw err;
    res.send('Ticket updated successfully');
  });
});

app.delete('/tickets/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tickets WHERE id=?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('Ticket deleted successfully');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
