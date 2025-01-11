// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Valider les variables d'environnement au démarrage est crucial pour s'assurer que l'application dispose de toutes les configurations nécessaires pour fonctionner correctement. Cela permet de détecter les erreurs de configuration tôt et d'éviter des comportements imprévisibles ou des échecs en cours d'exécution.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, l'application doit lever une erreur explicative et arrêter son exécution. Cela permet de signaler immédiatement le problème de configuration et d'éviter des erreurs difficiles à diagnostiquer plus tard.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  if (missingVars.length > 0) {
    throw new Error(`Les variables d'environnement suivantes sont manquantes : ${missingVars.join(', ')}`);
  }
}

// Appel de la fonction de validation au démarrage
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};