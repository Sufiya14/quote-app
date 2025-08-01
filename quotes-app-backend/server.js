const express = require('express'); //Importing Express, a Node.js framework to build APIs easily.
//const mongoose = require('mongoose');// Importing Mongoose, which helps us connect to MongoDB and define schemas (models).
const cors = require('cors');
//CORS stands for Cross-Origin Resource Sharing. This lets your frontend (React) make requests to your backend (Node.js) running on a different port.
//require('dotenv').config();//This loads variables from the .env file (like DB password, JWT secret) into your project safely.


//Importing the route files that we’ll use to define API endpoints for quotes and admin.

const quoteRoutes = require('./routes/quotes');
const adminRoutes = require('./routes/admin');


//Creating an Express app.
const app = express();
//Enabling CORS so that your frontend can call this backend.
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // allow React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



//This allows the server to accept JSON in requests (like POST request body).
app.use(express.json());

//app.use('/api/quotes', quoteRoutes);
app.use('/api/admin', adminRoutes);


const fs = require('fs');
const path = require('path');

const quotesFilePath = path.join(__dirname, 'data', 'quotes.json');


function readQuotes() {
  return JSON.parse(fs.readFileSync(quotesFilePath));
}

function writeQuotes(data) {
  fs.writeFileSync(quotesFilePath, JSON.stringify(data, null, 2));
}


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});



app.get('/api/quotes/:id', (req, res) => {
  const quotes = readQuotes();
  const quote = quotes.find((q) => String(q.id) === String(req.params.id));

  //const quote = quotes.find((q) => q.id === req.params.id);
  if (!quote) return res.status(404).json({ message: 'Quote not found' });
  res.json(quote);
});

app.get('/api/quotes', (req, res) => {
  try {
    const quotes = readQuotes();
    res.json(quotes);
  } catch (err) {
    console.error('Error reading quotes:', err);
    res.status(500).json({ error: 'Failed to load quotes' });
  }
});

// PUT route to update quote
app.put('/api/quotes/:id', async (req, res) => {
  const { id } = req.params;
  const { text, author, tags } = req.body;

  try {
    const data = await fs.promises.readFile('data/quotes.json', 'utf-8');
    let quotes = JSON.parse(data);

    const index = quotes.findIndex((q) => String(q.id) === String(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    quotes[index] = { ...quotes[index], text, author, tags };

    await fs.promises.writeFile('data/quotes.json', JSON.stringify(quotes, null, 2));

    res.json({ message: 'Quote updated successfully', quote: quotes[index] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while updating quote' });
  }
});


// POST route to add a quote
app.post('/api/quotes', (req, res) => {
  const { text, author, tags } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: 'Text and author are required' });
  }

  try {
    const quotes = readQuotes();
    const newQuote = {
      id: Date.now().toString(),
      text,
      author,
      tags: tags || []
    };

    quotes.push(newQuote);
    writeQuotes(quotes);

    res.status(201).json({ message: 'Quote added', quote: newQuote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add quote' });
  }
});

app.delete('/api/quotes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fs.promises.readFile('data/quotes.json', 'utf-8');
    let quotes = JSON.parse(data);

    const index = quotes.findIndex((q) => String(q.id) === String(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    quotes.splice(index, 1);

    await fs.promises.writeFile('data/quotes.json', JSON.stringify(quotes, null, 2));

    res.json({ message: 'Quote deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while deleting quote' });
  }
});

