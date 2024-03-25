// routes.mjs
import { User, Book } from "../../sequelize/sequelize.mjs";

import express from "express";
import { success } from "../helper.mjs";

import bcrypt from "bcrypt";

import { auth } from "../auth/auth.mjs";

const UserRouter = express();

// Route de get
UserRouter.get("/", auth, (req, res) => {
  return User.findAll()
    .then((User) => {
      const message = "La liste des utilisateurs a bien été récupérée.";
      res.status(200).json(User);
    })
    .catch((error) => {
      const message = `La liste des utilisateurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants. ${error}`;
      res.status(500).json(message);
    });
});

// Route GET avec id
UserRouter.get("/:id", auth, (req, res) => {
  const Id = req.params.id;
  return User.findByPk(Id)
    .then((User) => {
      const message = `L'utilisateur dont l'id vaut ${Id}`;
      res.status(200).json(User);
    })
    .catch((error) => {
      const message = `La liste des utilisateurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants. ${error}`;
      res.status(500).json(message);
    });
});

// obtenir tout les livres selon l'utilisateur
UserRouter.get("/:id/books", auth, (req, res) => {
  const UserId = req.params.id;
  let firstName_User;

  User.findByPk(UserId)
    .then((User) => {
      firstName_User = `${User.username_user}`;
      return Book.findAll({
        where: {
          fk_User: UserId,
        },
      })
        .then((books) => {
          const message = `La liste des livres de L'utilisateur ${firstName_User}`;
          res.status(200).json({ message, data: books });
        })
        .catch((error) => {
          const message = `La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants. ${error}`;
          res.status(400).json({ message, error });
        });
    })
    .catch((error) => {
      const message = `L'utilisateur ${UserId} n'existe pas`;
      return res.status(400).json({ message, error });
    });
});

// Route de post
UserRouter.post("/", auth, (req, res) => {
  let data = req.body;

  bcrypt
    .hash(req.body.password_user, 10) // temps pour hasher = du sel
    .then((hash) => {
      data.password_user = hash;
      console.log(data);
      User.create(data)
        .then((User) => {
          const message = `L'utilisateur à bien été créé`;
          return res.status(200).json(success(message, User));
        })
        .catch((error) => {
          const message = `L'utilisateur n'à pas bien été créé Error: ${error}`;
          return res.status(500).json(success(message, error));
        });
    });
});

// Route de delete
UserRouter.delete("/:id", auth, (req, res) => {
  const Id = req.params.id;

  return User.findByPk(Id)
    .then((User) => {
      return User.destroy()
        .then((User) => {
          const message = `L'utilisateur à bien été supprimé avec l'id`;
          res.status(200).json(success(message, User));
        })
        .catch((error) => {
          const message = `L'utilisateur n'à pas bien été supprimé Error: ${error}`;
          res.status(500).json(success(message, error));
        });
    })
    .catch((error) => {
      const message = `L'id ${Id} du livre n'a pas été trouvé`;
      res.status(500).json(success(message, error));
    });
});

// Exporter le routeur
export { UserRouter };
