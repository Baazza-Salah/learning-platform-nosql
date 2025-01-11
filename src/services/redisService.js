// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Gérer efficacement le cache avec Redis implique de définir des stratégies de mise en cache appropriées, telles que l'expiration des clés (TTL), l'invalidation du cache lorsque les données sous-jacentes changent, et l'utilisation de structures de données Redis adaptées aux besoins de l'application. Il est également important de surveiller les performances et l'utilisation de la mémoire pour éviter les problèmes de surcharge.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés descriptifs et hiérarchiques (par exemple, user:123:profile), l'ajout de préfixes pour éviter les collisions de noms, et la définition de TTL pour les données temporaires afin de libérer la mémoire automatiquement. Il est également recommandé de compresser les données volumineuses et de surveiller l'utilisation de la mémoire.

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
  }
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
  };