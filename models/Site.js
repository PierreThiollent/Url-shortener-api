const mongoose = require('mongoose');

// Schéma de données
// => ID généré automatiquement
const siteSchema = mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
});

// On exporte le schéma en tant que modèle
module.exports = mongoose.model('Site', siteSchema);
