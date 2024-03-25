import { DataTypes, Sequelize } from "sequelize";

import { bookModel } from "../model/t_books.mjs";
import { authorModel } from "../model/t_authors.mjs"
import { categoryModel } from "../model/t_categories.mjs"
import { commentModel } from "../model/t_comments.mjs"
import { publisherModel } from "../model/t_publishers.mjs"
import { userModel } from "../model/t_users.mjs";

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
const author = authorModel(sequelize, DataTypes);
const category = categoryModel(sequelize, DataTypes);
const comment = commentModel(sequelize, DataTypes);
const publisher = publisherModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);

let initDb = () => {
  return sequelize
    .sync({ force: true }) //Force la syncronisation dans la db et écrase ce qui était présent avant
    .then((_) => {
        //Ajout de mocks ici pour remplir la db
       //importBooks();
      //importUsers();
    });
};

// Remplissage de la base de données avec des mocks
/*
const importBooks = () => {
    bookData.map((bookData) => {
        Book.create({
            id: bookData.id,
            title: bookData.title,
            categorie: bookData.categorie,
            nbPages: bookData.nbPages,
            extrait: bookData.extrait,
            resume: bookData.resume,
            authorFirstName: bookData.authorFirstName,
            authorLastName: bookData.authorLastName,
            editorFirstName: bookData.editorFirstName,
            editorLastName: bookData.editorLastName,
            editionYear: bookData.editionYear,
            avgAppreciation: bookData.avgAppreciation,
            comments: bookData.comments,
            cover: bookData.cover
      }).then((bookData) => console.log(bookData.toJSON()));
    });
};
*/

// Exportation de la structure de la base de donnée pour créer les routes,
// la synchro de la db et les informations de connexion à la db à l'aide de sequelize
export { sequelize, initDb, Book, User, author, category, comment, publisher};