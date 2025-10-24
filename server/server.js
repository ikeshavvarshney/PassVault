const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.json());
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'PassVault';

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

// Connect to MongoDB
client.connect().then(() => {
  console.log('Connected successfully to MongoDB server');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const sanitizeKey = (key) => key.replace(/\./g, '___');
const restoreKey = (key) => key.replace(/___/g, '.');

// Get all passwords
app.get('/get', (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  collection.findOne({})
    .then(doc => {
      const vault = doc?.vault || {};
      const restoredVault = Object.fromEntries(
        Object.entries(vault).map(([url, users]) => [restoreKey(url), users])
      );
      res.json({ success: true, vault: restoredVault });
    })
    .catch(err => res.status(500).json({ success: false, message: 'Error fetching vault' }));
});

//Save a new password
app.post('/save', (req, res) => {
  const newVault = req.body; // frontend object structure: { "url": { "username": "password" } }

  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const sanitizedVault = Object.fromEntries(
    Object.entries(newVault).map(([url, users]) => [`vault.${sanitizeKey(url)}`, users])
  );

  collection.updateOne({}, { $set: sanitizedVault }, { upsert: true })
    .then(() => res.json({ success: true, message: 'Vault updated!' }))
    .catch(err => res.status(500).json({ success: false, message: 'Error updating vault' }));
});

// Delete a password
app.delete('/delete', (req, res) => {
  const { url, username } = req.body; // Frontend sends { url: "example.com", username: "user1" }

  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const sanitizedUrl = sanitizeKey(url);

  collection.findOne({})
    .then(doc => {
      if (!doc || !doc.vault || !doc.vault[sanitizedUrl] || !doc.vault[sanitizedUrl][username]) {
        return res.status(404).json({ success: false, message: 'Username not found' });
      }
      delete doc.vault[sanitizedUrl][username];

      if (Object.keys(doc.vault[sanitizedUrl]).length === 0) {
        delete doc.vault[sanitizedUrl];
      }
      return collection.updateOne({}, { $set: { vault: doc.vault } });
    })
    .then(result => {
      if (!result) return;
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting password:', err);
      res.status(500).json({ success: false, message: 'Error deleting password' });
    });
});
