const { readAndAppend, writeToFile, readFromFile } = require('../helpers/helper.js');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');


// Get Request
router.get('/notes', (req, res) => {
  readFromFile('./db/db.json')
  .then(data => res.json(JSON.parse(data)))
});

// Post Request
router.post("/notes", (req, res) => {
  const { title, textBody } = req.body;

  if (req.body) {
    const newNote = {
      title,
      textBody,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(newNote);
  } else {
    res.errored('There was an error creating your note. Please try again');
  }
});

// Delete Request
router.delete("/notes/:id", (req, res) => {
const note_id = req.params.id;
readFromFile('./db/db.json')
.then(data => JSON.parse(data))
.then(notes => {
  const newNotes = notes.filter(note => note.id!== note_id);
  writeToFile('./db/db.json', JSON.stringify(newNotes));
  res.json(newNotes);
});
});

module.exports = router;