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
  try {
    const courseData = req.body;
    const collection = db.getDb().collection("courses");
    const result = await mongoService.createCourse(courseData);
    const insertedId = result.insertedId.toString(); 
    await redisService.cacheData(insertedId, courseData, 3600);
    res.status(201).json({
      message: "Course created successfully",
      courseId: insertedId,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      message: "Error creating course",
      error: error.message || error,
    });
  }
}


async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    const collection = db.getDb().collection("courses");
    const course = await mongoService.findOneById(collection, courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Error retrieving course:", error);
    res.status(500).json({
      message: "Error retrieving course",
      error: error.message || error,
    });
  }
}

async function getCourseStats(req, res) {
  try {
    const collection = db.getDb().collection("courses");
    const stats = await collection
      .aggregate([
        {
          $group: {
            _id: null,
            totalCourses: { $sum: 1 },
          },
        },
      ])
      .toArray();
    res.status(200).json(stats[0]);
  } catch (error) {
    console.error("Error retrieving course stats:", error);
    res.status(500).json({
      message: "Error retrieving course stats",
      error: error.message || error,
    });
  }
}


// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats,
};