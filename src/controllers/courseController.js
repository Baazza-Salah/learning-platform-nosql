// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Une route est une URL spécifique qui correspond à une action dans une application web, tandis qu'un contrôleur est une fonction ou un ensemble de fonctions qui gèrent les requêtes HTTP pour ces routes. Les routes définissent les points d'entrée de l'application, et les contrôleurs contiennent la logique métier pour traiter les requêtes et générer les réponses.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Séparer la logique métier des routes permet de rendre le code plus modulaire, maintenable et testable. Les routes se concentrent sur le routage des requêtes, tandis que les contrôleurs gèrent la logique métier. Cela facilite également la réutilisation du code et la gestion des dépendances.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
};