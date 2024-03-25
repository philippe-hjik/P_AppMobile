import { DataTypes, Sequelize } from "sequelize";

import { bookModel } from "../model/t_books.mjs";
import { categoryModel } from "../model/t_categories.mjs"

// Permet d'utiliser des variables d'environnement
import dotenv from 'dotenv';

// Charge les variables d'environnement dans le processus d'application
dotenv.config();


// Importation du cryptage d'information
//import { hash, bcrypt } from "bcrypt";

// Connexion à la base de donnée en utilisant des variable d'environnement
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la DB qui doit exister
  process.env.DB_USER, // Nom de l'utilisateur
  process.env.DB_PASSWORD, // Mot de passe de l'utilisateur
  {
    host: process.env.DB_HOST, // Adresse du Serveur
    port: process.env.DB_PORT, // Port
    dialect: "mysql",
    logging: false,
  }
);

// Importation des models sequelize pour créer la structure de données dans la base de données
const Book = bookModel(sequelize, DataTypes);
const category = categoryModel(sequelize, DataTypes);

let initDb = () => {
  return sequelize
    .sync({ force: true }) //Force la syncronisation dans la db et écrase ce qui était présent avant
    .then((_) => {
    });
};

// Exportation de la structure de la base de donnée pour créer les routes,
// la synchro de la db et les informations de connexion à la db à l'aide de sequelize
export { sequelize, initDb, Book, category};