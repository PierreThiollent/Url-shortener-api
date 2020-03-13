const dns = require('dns');
const Site = require('../models/Site');

// Génère un url random
const randomUrl = () => {
  return Math.random()
    .toString(36)
    .substring(5);
};

exports.shortUrl = (req, res) => {
  let { url } = req.body;

  // Formate l'url
  url = url.replace(/^https?:\/\//, '');

  // Vérifie que l'Url est correcte
  dns.lookup(url, (error, addresses, family) => {
    if (error) {
      res.json({ error: "L'url est invalide, veuillez réessayer." });
    } else {
      // On instancie un nouvel objet site
      const site = new Site({
        originalUrl: url,
        shortUrl: randomUrl(),
      });

      // Enregistre un site en bdd
      site
        .save()
        .then(site =>
          res.status(201).json({
            originalUrl: site.originalUrl,
            shortUrl: `${req.protocol}://${req.get('Host')}/${site.shortUrl}`,
          }),
        )
        .catch(error => res.status(400).json({ error: "Une erreur s'est produite, veuillez réessayer" }));
    }
  });
};

exports.getShortUrl = (req, res) => {
  Site.findOne({ shortUrl: req.params.id })
    .then(site => res.redirect('https://' + site.originalUrl))
    .catch(error => res.status(400).json({ error: "Cet url n'est pas valide, elle a peut-être expiré." }));
};
