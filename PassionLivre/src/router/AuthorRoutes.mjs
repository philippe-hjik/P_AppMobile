// routes.mjs
import { Book, author } from "../../sequelize/sequelize.mjs";
import { success } from "../helper.mjs";
import express from "express";

import { auth } from "../auth/auth.mjs";

const authorRouter = express();

// Route de get
authorRouter.get("/", auth, (req, res) => {
  return author
    .findAll()
    .then((author) => {
      const message = "La liste des livres a bien été récupérée.";
      res.status(200).json(author);
    })
    .catch((error) => {
      const message = `La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants. ${error}`;
      res.status(500).json(success(message, error));
    });
});

// Route GET avec id
authorRouter.get("/:id", auth, (req, res) => {
  const Id = req.params.id;
  return author
    .findByPk(Id)
    .then((author) => {
      const message = `L'auteur dont L'auteur vaut ${Id}`;
      res.status(200).json(success(author, message));
    })
    .catch((error) => {
      const message = `La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants. ${error}`;
      res.status(500).json(success(message, error));
    });
});

// obtenir tout les livres de cet auteur
authorRouter.get("/:id/books", auth, (req, res) => {
  const authorId = req.params.id;
  let firstName_author;

  author
    .findByPk(authorId)
    .then((author) => {
      firstName_author = `${author.firstName_author} ${author.lastName_author}`;
      return Book.findAll({
        where: {
          fk_author: authorId,
        },
      }).then((books) => {
        const message = `La liste des livres de L'auteur ${firstName_author}`;
        res.status(200).json({ message, data: books });
      }).catch((error) => {
        const message = `La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants. ${error}`;
        res.status(400).json({ message, error });
      });
    })
    .catch((error) => {
      const message = `L'auteur ${authorId} n'existe pas`;
      return res.status(400).json({ message });
    });
});

// Route de post
authorRouter.post("/", auth, (req, res) => {
  return author
    .create(req.body)
    .then((author) => {
      const message = `L'auteur à bien été créé`;
      res.status(200).json({ message, data: author });
    })
    .catch((error) => {
      const message = `L'auteur n'à pas bien été créé Error: ${error}`;
      res.status(500).json({ message, error });
    });
});

// Route de update avec id
authorRouter.put("/:id", auth, (req, res) => {
  const Id = req.params.id;

  return author
    .findByPk(Id)
    .then((author) => {
      return author
        .update(req.body)
        .then((author) => {
          const message = `L'auteur à bien été modifié créé`;
          res.status(200).json({ message, data: author });
        })
        .catch((error) => {
          const message = `L'auteur n'à pas bien été créé Error: ${error}`;
          res.status(500).json(success(message, error));
        });
    })
    .catch((error) => {
      const message = `L'id ${Id} n'a pas été trouvé`;
      res.status(500).json(success(message, error));
    });
});

// Route de delete
authorRouter.delete("/:id", auth, (req, res) => {
  const Id = req.params.id;

  return author
    .findByPk(Id)
    .then((author) => {
      return author
        .destroy()
        .then((author) => {
          const message = `L'auteur avec l'id ${Id} à bien été supprimé`;
          res.status(200).json({ message, data: author });
        })
        .catch((error) => {
          const message = `L'auteur n'à pas bien été supprimé Error: ${error}`;
          res.status(500).json(success(message, error));
        });
    })
    .catch((error) => {
      const message = `L'auteur avec l'id ${Id} n'a pas été trouvé`;
      res.status(500).json(success(message, error));
    });
});

// Exporter le routeur
export { authorRouter };
