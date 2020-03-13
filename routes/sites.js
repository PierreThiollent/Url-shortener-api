const express = require('express');
const sitesController = require('../controllers/sites');

// On crée un router
const router = express.Router();

// Route pour raccourcir une url
router.post('/short', sitesController.shortUrl);
// Route pour obtenir l'url raccourcie
router.get('/:id', sitesController.getShortUrl);

module.exports = router;
