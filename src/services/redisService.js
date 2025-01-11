// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Gérer efficacement le cache avec Redis implique de définir des stratégies de mise en cache appropriées, telles que l'expiration des clés (TTL), l'invalidation du cache lorsque les données sous-jacentes changent, et l'utilisation de structures de données Redis adaptées aux besoins de l'application. Il est également important de surveiller les performances et l'utilisation de la mémoire pour éviter les problèmes de surcharge.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés descriptifs et hiérarchiques (par exemple, user:123:profile), l'ajout de préfixes pour éviter les collisions de noms, et la définition de TTL pour les données temporaires afin de libérer la mémoire automatiquement. Il est également recommandé de compresser les données volumineuses et de surveiller l'utilisation de la mémoire.

const redis = require("redis");
const client = redis.createClient({ url: process.env.REDIS_URI });

client.on("error", (err) => console.error("Redis Client Error", err));

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
    try {
      await connectRedis();
      await client.set(key, JSON.stringify(data), { EX: ttl });
      console.log(`Data cached with key: ${key}`);
    } catch (error) {
      console.error("Error caching data:", error);
      throw error;
    }
  }

  async function getData(key) {
    try {
      await connectRedis();
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting cached data:", error);
      throw error;
    }
  }
  
  async function deleteData(key) {
    try {
      await connectRedis();
      await client.del(key);
      console.log(`Data deleted with key: ${key}`);
    } catch (error) {
      console.error("Error deleting cached data:", error);
      throw error;
    }
  }
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
    getData,
    deleteData,
    connectRedis,
  };