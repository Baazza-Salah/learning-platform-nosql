// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser et de réutiliser le code de connexion, de gérer les erreurs et les retries de manière cohérente, et de faciliter la maintenance et les tests.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour gérer proprement la fermeture des connexions, il est important d'écouter les événements de fermeture de l'application (comme process.on('SIGINT')) et de fermer les connexions aux bases de données de manière appropriée en appelant les méthodes de fermeture fournies par les clients de base de données.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    mongoClient = new MongoClient(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    db = mongoClient.db(config.mongoDbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    setTimeout(connectMongo, 5000);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  try {
    redisClient = redis.createClient({ url: config.redisUri });
    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err);
    });
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    setTimeout(connectRedis, 5000);
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getMongoClient: () => mongoClient,
  getRedisClient: () => redisClient,
  getDb: () => db,
};