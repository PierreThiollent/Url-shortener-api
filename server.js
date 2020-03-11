// On require le module http de node
var http = require('http');
// On importe notre app express
const app = require('./app');

// Methode permettant de renvoyer un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// On définit le port de l'app
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// Recherche les erreurs et les gère
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const adresse = server.address();
  const bind = typeof adresse === 'string' ? 'pipe ' + adresse : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// On crée un serveur en lui passant l'app express
const server = http.createServer(app);

server.on('error', errorHandler);
// Ecouteur d'évènement retournant l'adresse ou le port
server.on('listening', () => {
  const adresse = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// On demande au serveur d'écouter sur le port normalizé plus haut
server.listen(port);
