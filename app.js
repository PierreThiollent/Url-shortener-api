var express = require('express');
var cors = require('cors');

const app = express();

app.use(cors());

// On sert le dossier public de manière statique
app.use('/public', express.static(process.cwd() + '/public'));

// On retourne l'index.html sur la route /
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

module.exports = app;
