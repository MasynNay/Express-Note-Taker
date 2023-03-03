const fs = require('fs');
const express = require('express');
const path = require('path');
const api = require('./routes/routes');
const PORT = process.env.PORT|| 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Sends Notes to notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));

});

// Defaults to home if there aren't any matching results
app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});