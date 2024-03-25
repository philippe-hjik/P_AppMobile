<!-- Header -->
<h1 align="center">Passion Livre</h1>
<p align="center">
  projet API REST
</p>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/Built%20with-Node.js-green" alt="Built with Node.js">
  <img src="https://img.shields.io/github/license/philippe-hjik/PassionLivre" alt="License">
</p>
<!-- Build with love -->
<p align="center">
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="Built with Love">
</p>

<!-- Table of Contents -->
## Table des matières
- [Utilisation](#utilisation)
- [Installation](#installation)
- [License](#license)

<!-- Utilisation -->
## Utilisation
| Nom de la requête         | Description                                     | Méthode | URL                                        |
|----------------------------|-------------------------------------------------|---------|--------------------------------------------|
| All categories             | Récupérer toutes les catégories                | GET     | http://localhost:3000/api/categories      |
| One categorie              | Récupérer une seule catégorie                   | GET     | http://localhost:3000/api/categories/2    |
| All books one categorie    | Récupérer tous les livres d'une catégorie      | GET     | http://localhost:3000/api/categories/2/books |
| Create a categorie         | Créer une nouvelle catégorie                    | POST    | http://localhost:3000/api/categories      |
| Modify a categorie         | Modifier une catégorie existante                | PUT     | http://localhost:3000/api/categories/3    |
| Delet a categorie          | Supprimer une catégorie existante               | DELETE  | http://localhost:3000/api/categories/3    |
| All Books                  | Récupérer tous les livres                       | GET     | http://localhost:3000/api/books           |
| One Book                   | Récupérer un seul livre                         | GET     | http://localhost:3000/api/books/2         |
| Create a Book              | Créer un nouveau livre                          | POST    | http://localhost:3000/api/books           |
| Modify a Book              | Modifier un livre existant                      | PUT     | http://localhost:3000/api/books/4         |
| Delete a Book              | Supprimer un livre existant                     | DELETE  | http://localhost:3000/api/books/4         |
| Create a User              | Créer un nouvel utilisateur                    | POST    | http://localhost:3000/api/users           |
| Delete a user              | Supprimer un utilisateur                        | DELETE  | http://localhost:3000/api/users/2         |
| All users                  | Récupérer tous les utilisateurs                 | GET     | http://localhost:3000/api/users           |
| One user                   | Récupérer un seul utilisateur                   | GET     | http://localhost:3000/api/users/1         |
| books user                 | Récupérer les livres d'un utilisateur           | GET     | http://localhost:3000/api/users/1/books   |
| Get a token                | Obtenir un jeton d'authentification             | POST    | http://localhost:3000/api/login           |
<!-- Installation -->
## Installation
Configurer les variables d'environnement dans le fichier `.env`
|  nom de variable  |          utilisation          |
|-------------------|-------------------------------|
|`DB_HOST=localhost`| adresse du serveur            |
|`DB_NAME=db_library` | nom de la base de données     |
|`DB_USER=root`     | nom de l'utilisateur          |
|`DB_PASSWORD=root` | mot de passe de l'utilisateur |
|`DB_PORT=6033`     | port de la base de donnée     |

<!-- Contribuer -->
## routes
<img src="https://contrib.rocks/image?repo=philippe-hjik/PassionLivre">

<!-- License -->
## License
[MIT License](LICENSE)
