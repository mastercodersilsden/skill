const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my Node.js Express server! 🚀');
});

app.get('/api/hello', (req, res) => {
  const name = req.query.name || 'World';
  res.json({ message: `Hello, ${name}!` });
});

app.post('/api/echo', (req, res) => {
  res.json({ echo: req.body.message || 'Nothing to echo' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
