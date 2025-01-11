// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers permet de mieux organiser le code, de le rendre plus lisible et maintenable. Cela facilite également la gestion des routes, surtout dans les grandes applications où il peut y avoir de nombreuses routes. Chaque fichier de routes peut se concentrer sur une fonctionnalité ou une ressource spécifique, ce qui améliore la modularité du code.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Pour organiser les routes de manière cohérente, il est recommandé de regrouper les routes par fonctionnalité ou ressource. Utiliser des noms de fichiers et des structures de dossiers clairs et descriptifs. Par exemple, avoir un dossier routes avec des fichiers comme courseRoutes.js, userRoutes.js, etc. De plus, il est utile de suivre les conventions RESTful pour nommer les routes et les méthodes HTTP.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;