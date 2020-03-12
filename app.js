const express = require('express');
const cors = require('cors');
const dns = require('dns');
const mongoose = require('mongoose');
const sitesRoutes = require('./routes/sites');

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

app.use('/api/shorturl/', sitesRoutes);

module.exports = app;
