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

const sanitizeKey = key => key.replace(/\./g, '___');
const restoreKey = key => key.replace(/___/g, '.');

// Get all passwords
app.get('/vault', (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  collection.findOne({})
    .then(doc => {
      const vault = doc?.vault || {};
      const restoredVault = Object.fromEntries(
        Object.entries(vault).map(([url, users]) => [ restoreKey(url), users ])
      );
      res.json({ success: true, vault: restoredVault });
    })
    .catch(err => res.status(500).json({ success: false, message: 'Error fetching vault' }));
});



//Save a new password
app.post('/save-password', (req, res) => {
  const newVault = req.body; // frontend object

  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const sanitizedVault = Object.fromEntries(
    Object.entries(newVault).map(([url, users]) => [ `vault.${sanitizeKey(url)}`, users ])
  );

  collection.updateOne({}, { $set: sanitizedVault }, { upsert: true })
    .then(() => res.json({ success: true, message: 'Vault updated!' }))
    .catch(err => res.status(500).json({ success: false, message: 'Error updating vault' }));
});


// Delete a password


app.delete('/vault', (req, res) => {
  const { url, username } = req.body;
  if (!url || !username) return res.status(400).json({ success: false, message: 'url and username required' });

  const db = client.db(dbName);
  const collection = db.collection('passwords');

  collection.findOne({})
    .then(doc => {
      if (!doc || !doc.vault) return res.status(404).json({ success: false, message: 'Vault is empty' });

      const sanitizedUrl = sanitizeKey(url);
      if (!doc.vault[sanitizedUrl] || !doc.vault[sanitizedUrl][username]) {
        return res.status(404).json({ success: false, message: 'No matching password found' });
      }

      // Now safely delete
      const path = `vault.${sanitizedUrl}.${username}`;
      return collection.updateOne({}, { $unset: { [path]: "" } });
    })
    .then(result => {
      if (result && result.modifiedCount > 0) {
        res.status(200).json({ success: true, message: 'Deleted successfully', result });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error deleting password' });
    });
});
