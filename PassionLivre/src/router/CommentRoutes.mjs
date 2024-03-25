// routes.mjs
import { comment } from "../../sequelize/sequelize.mjs"
import express from 'express';

const commentRouter = express();

import { auth } from "../auth/auth.mjs";

// Route de get
commentRouter.get('/', auth, (req, res) => {
 return comment.findAll()    
 .then((comment) => {
    const message = "La liste des commentaires a bien été récupérée.";
    res.status(200).json(comment);
  })
  .catch((error) => {
    const message = `La liste des commentaires n'a pas pu être récupérée. Merci de réessayer dans quelques instants. ${error}`;
    res.status(500).json(message);
  });
});

// Route de get avec id
commentRouter.get('/:id', auth, (req, res) => {
    const Id = req.params.id;
    return comment.findByPk(Id)    
    .then((comment) => {
       const message = `Le commentaire dont le commentaire vaut ${Id}`;
       res.status(200).json(comment);
     })
     .catch((error) => {
       const message = `La liste des commentaires n'a pas pu être récupérée. Merci de réessayer dans quelques instants. ${error}`;
       res.status(500).json(message);
    });
});

// Route de post
commentRouter.post('/', auth, (req, res) => {
    const title_book = req.body.title_book;
    return comment.create({
        title_book: title_book
    })
    .then((comment) => {
        const message = `Le commentaire à bien été créé`;
        res.status(200).json(comment);
      })
      .catch((error) => {
        const message = `Le commentaire n'à pas bien été créé Error: ${error}`;
        res.status(500).json(message);
     });
});

// Route de update avec id
commentRouter.put('/:id', auth, (req, res) => {
    const Id = req.params.id;
    const title_book = req.body.title_book;

    return comment.findByPk(Id).then((comment) => {
        return comment.update({
            title_book: title_book
        })
        .then((comment) => {
            const message = `Le commentaire à bien été créé`;
            res.status(200).json(comment);
          })
          .catch((error) => {
            const message = `Le commentaire n'à pas bien été créé Error: ${error}`;
            res.status(500).json(message);
         });
    }).catch((error) => {
        const message = `L'id ${Id} n'a pas été trouvé`;
        res.status(500).json(message);
     });
});

// Route de delete
commentRouter.delete('/:id', auth, (req, res) => {
    const Id = req.params.id;

    return comment.findByPk(Id).then((comment) => {
        return comment.destroy()
        .then((comment) => {
            const message = `Le commentaire à bien été supprimé avec l'id`;
            res.status(200).json(comment);
          })
        .catch((error) => {
            const message = `Le commentaire n'à pas bien été supprimé Error: ${error}`;
            res.status(500).json(message);
        });
    }).catch((error) => {
        const message = `L'id ${Id} du commentaire n'a pas été trouvé`;
        res.status(500).json(message);
    });
});


// Exporter le routeur
export { commentRouter };
