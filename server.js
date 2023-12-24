const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'emp_database',
});

db.connect((err) => {
  if (err) {
    console.log('MySQL Connection Failed: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Define REST API routes and CRUD operations

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





// Get all orders
app.get("/" , async(req,res)=>{
    res.send("hey there")
})
app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM Order_Header', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Get an order by ID
  app.get('/api/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    db.query('SELECT * FROM Order_Header WHERE ORDER_ID = ?', [orderId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Create a new order
  app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    db.query('INSERT INTO Order_Header SET ?', newOrder, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ orderId: result.insertId });
      }
    });
  });
  
  // Update an existing order
  app.put('/api/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const updatedOrder = req.body;
    db.query('UPDATE Order_Header SET ? WHERE ORDER_ID = ?', [updatedOrder, orderId], (err) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Order updated successfully' });
      }
    });
  });
  
  // Delete an order
  app.delete('/api/orders/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    db.query('DELETE FROM Order_Header WHERE ORDER_ID = ?', [orderId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.json({ message: 'Order deleted successfully' });
      }
    });
  });


  app.get('/persons', (req, res) => {
    db.query('SELECT * FROM Person', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  // GET a specific person by PARTY_ID
//   done
  app.get('/persons/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Person WHERE PARTY_ID = ?', [id], (error, results) => {
      if (error) throw error;
      res.json(results[0]);
    });
  });
  
  // POST a new person
  app.post('/persons', (req, res) => {
    const person = req.body;
    db.query('INSERT INTO Person SET ?', person, (error, results) => {
      if (error) throw error;
      res.json({ id: results.insertId });
    });
  });
  
  // PUT update a person by PARTY_ID
  // done
  app.put('/persons/:id', (req, res) => {
    const { id } = req.params;
    const updatedPerson = req.body;
    db.query('UPDATE Person SET ? WHERE PARTY_ID = ?', [updatedPerson, id], (error) => {
      if (error) throw error;
      res.json({ message: 'Person updated successfully' });
    });
  });
  
  // DELETE a person by PARTY_ID
  app.delete('/persons/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Person WHERE PARTY_ID = ?', [id], (error) => {
      if (error) throw error;
      res.json({ message: 'Person deleted successfully' });
    });
  });
  
  app.listen(3001, () => {
    console.log(`Server is running on port ${port}`);
  });



