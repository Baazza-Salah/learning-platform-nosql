// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de centraliser et de réutiliser la logique métier et les interactions avec les bases de données. Cela rend le code plus modulaire, maintenable et testable. Les services peuvent être utilisés par différents contrôleurs ou autres parties de l'application, ce qui facilite la gestion des dépendances et la réutilisation du code.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }
    const objectId = ObjectId.createFromHexString(id);
    const result = await collection.findOne({ _id: objectId });
    return result;
  } catch (error) {
    console.error("Error finding document by ID:", error);
    throw error;
  }
}

async function insertOne(collection, data) {
  try {
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error("Error inserting document:", error);
    throw error;
  }
}


// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  insertOne,
};