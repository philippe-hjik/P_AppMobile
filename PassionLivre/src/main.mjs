
// Importation de express
import express from "express";

// Permet de créer la base de données sans information avec les models sequelize
import { initDb, sequelize } from "../sequelize/sequelize.mjs";

// Imporation des routes pour t_books
import { bookRouter } from "./router/BookRoutes.mjs"

// routeur category
import { categoryRouter } from "./router/CategoriesRoutes.mjs";

const app = express();

// Port d'écoute
const port = 80;

//Iniatialise la db avec les models sequelize
initDb();

// Connexion à la base de donnée grâce à sequelize
sequelize.authenticate().then((_) => {
  console.log("Connexion établie");
}).catch((error) => {
  console.error(`Impossible de se connecter à la base de donnée ${error}`);
})

// Converti les informations de la réponse en json
app.use(express.json());

// Route principale
app.get("/api", (req, res) => {
  res.send("API REST of library");
});

// Routes de t_book commençant à "/book"
app.use("/api/books", bookRouter);

app.use("/api/categories", categoryRouter);

// Ecoute sur le port pour les incomings request
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
    res.status(404).json(message);
});