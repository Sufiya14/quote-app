const express = require('express');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();
const filePath = path.join(__dirname, '../data/quotes.json');

const readQuotes = () => JSON.parse(fs.readFileSync(filePath));
const writeQuotes = (quotes) => fs.writeFileSync(filePath, JSON.stringify(quotes, null, 2));

// GET /api/quotes
router.get('/', (req, res) => {
  const { search, tag } = req.query;
  let quotes = readQuotes();

  if (search) {
    quotes = quotes.filter(q =>
      q.text.toLowerCase().includes(search.toLowerCase()) ||
      q.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (tag) {
    quotes = quotes.filter(q => q.tags.includes(tag));
  }

  res.json(quotes.reverse());
});

// POST /api/quotes
router.post('/', auth, (req, res) => {
  const quotes = readQuotes();
  const newQuote = {
    id: quotes.length ? quotes[quotes.length - 1].id + 1 : 1,
    ...req.body,
    createdAt: new Date()
  };
  quotes.push(newQuote);
  writeQuotes(quotes);
  res.json(newQuote);
});

// PUT /api/quotes/:id
router.put('/:id', auth, (req, res) => {
  let quotes = readQuotes();
  //const index = quotes.findIndex(q => q.id == req.params.id);
  const index = quotes.findIndex(q => String(q.id) === String(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Quote not found" });

  quotes[index] = { ...quotes[index], ...req.body };
  writeQuotes(quotes);
  res.json(quotes[index]);
});

// DELETE /api/quotes/:id
router.delete('/:id', auth, (req, res) => {
  let quotes = readQuotes();
  const filtered = quotes.filter(q => q.id != req.params.id);
  if (quotes.length === filtered.length) return res.status(404).json({ message: "Not found" });

  writeQuotes(filtered);
  res.json({ message: "Deleted" });
});

module.exports = router;
