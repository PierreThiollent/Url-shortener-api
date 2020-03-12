const express = require('express');
const cors = require('cors');
const dns = require('dns');
const mongoose = require('mongoose');
const Site = require('./models/Site');

const app = express();
let id = 0;

// Connexion à la bdd
mongoose
  .connect('mongodb+srv://pierre_t76:AqzA9qF6cyRGEcj4@cluster0-bveai.mongodb.net/url-shortener?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.error('Connexion à MongoDB échouée !'));

// Set les CORS
app.use(cors());

// On sert le dossier public de manière statique
app.use('/public', express.static(process.cwd() + '/public'));

// On retourne l'index.html sur la route /
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Converti le body de la requete
app.use(express.urlencoded({ extended: false }));

// Route pour récupérer une url courte
app.post('/api/shorturl/new', (req, res) => {
  let { url } = req.body;
  // Formate l'url
  url = url.replace(/^https?:\/\//, '');

  // Vérifie que l'Url est correcte
  dns.lookup(url, (error, addresses, family) => {
    if (error) {
      res.json({ error: 'Invalid url' });
    } else {
      id++;
      // On instancie un nouvel objet site
      const site = new Site({
        originalUrl: url,
        shortUrl: id,
      });

      // Enregistre un site en bdd
      site
        .save()
        .then(() => res.status(201).json({ message: 'Objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
    }
  });
});

app.get('/api/shorturl/:id', (req, res) => {
  const { id } = req.query;
  const shortUrl = links.find(link => link.id === id);
  // TODO : Récupérer l'entrée en base et rediriger vers l'url originale
  res.redirect(shortUrl.original_url);
});

module.exports = app;
