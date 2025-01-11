// Question: Comment organiser le point d'entrée de l'application ?
// Reponse : Organiser le point d'entrée de l'application implique de configurer les connexions aux bases de données, de configurer les middlewares Express, de monter les routes, et de démarrer le serveur. Il est également important de gérer proprement l'arrêt de l'application pour fermer les connexions aux bases de données.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Reponse : La meilleure façon de gérer le démarrage de l'application est d'utiliser une fonction asynchrone pour initialiser les connexions aux bases de données, configurer les middlewares, monter les routes, et démarrer le serveur. En cas d'erreur, il est important de capturer et de gérer les erreurs pour éviter que l'application ne démarre dans un état incohérent.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    // TODO: Configurer les middlewares Express
    app.use(express.json());

    // TODO: Monter les routes
    app.use('/api/courses', courseRoutes);
    app.use('/api/students', studentRoutes);

    // TODO: Démarrer le serveur
    const port = config.port || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  try {
    await db.closeConnections();
    console.log('Connections closed gracefully');
    process.exit(0);
  } catch (error) {
    console.error('Error closing connections:', error);
    process.exit(1);
  }
});

startServer();