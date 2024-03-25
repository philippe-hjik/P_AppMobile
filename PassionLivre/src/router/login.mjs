import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../sequelize/sequelize.mjs";
import { privateKey } from "../auth/private_key.mjs";

const loginRouter = express();

loginRouter.post("/", (req, res) => {
  User.findOne({ where: { username_user: req.body.username_user } })
    .then((user) => {
      if (!user) { 
        const message = `L'utilisateur demandé n'existe pas`;
        return res.status(404).json({ message });
      }
      console.log(user);
      console.log(req.body);
      
      bcrypt
        .compare(req.body.password_user, user.password_user)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = `Le mot de passe est incorrecte. ${isPasswordValid} ${req.body.password_user}  ${user.password_user}`;
            return res.status(401).json({ message });
          } else {
            // JWT
            const token = jwt.sign({ id_user: user.id_user }, privateKey, {
              expiresIn: "1y",
            });
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          }
        });
    })
    .catch((error) => {
      const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
      return res.json({ message, data: error });
    });
});
export { loginRouter };