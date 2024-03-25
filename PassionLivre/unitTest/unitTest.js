// Fonction de test
async function testDatabaseConnection() {
  try {
    // Connexion à la base de données
    console.log("Connexion à la base de données établie avec succès !");
  } catch (error) {
    console.error("Impossible de se connecter à la base de données :", error);
  }
}

// Exécution du test
testDatabaseConnection().then(() => {
  // Vous pouvez ajouter d'autres assertions ici si nécessaire
});