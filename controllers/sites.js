const Site = require('../models/Site');

exports.shortUrl = (req, res) => {
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
};

exports.getShortUrl = (req, res) => {
  const { id } = req.params;
  // TODO : Récupérer l'entrée en base et rediriger vers l'url originale
  // const shortUrl = links.find(link => link.id === id);
  // res.redirect(shortUrl.original_url);
};
