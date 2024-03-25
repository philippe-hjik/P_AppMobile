
// Importation de express
import express from "express";

// Permet de créer la base de données sans information avec les models sequelize
import { initDb, sequelize } from "../sequelize/sequelize.mjs";

// Imporation des routes pour t_books
import { bookRouter } from "./router/BookRoutes.mjs"

// Imporation des routes pour t_comments
import { commentRouter } from "./router/CommentRoutes.mjs"

// routeur category
import { categoryRouter } from "./router/CategoriesRoutes.mjs";

// routeur utilsateur
import { UserRouter } from "./router/UserRoutes.mjs";

// routeur auteur
import { authorRouter } from "./router/AuthorRoutes.mjs";

// routeur login
import { loginRouter } from "./router/login.mjs";

/* swagger à faire
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.mjs";
*/
const app = express();

// Port d'écoute
const port = 3000;

//Iniatialise la db avec les models sequelize
//initDb();

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

// Routes de t_comment commençant à "/comment"
app.use("/api/comments", commentRouter);

app.use("/api/categories", categoryRouter);

app.use("/api/users", UserRouter);

app.use("/api/authors", authorRouter);

app.use("/api/login", loginRouter);

// swagger route
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

// Ecoute sur le port pour les incomings request
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
    res.status(404).json(message);
});