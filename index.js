// Importar express
const express = require("express");
// Importar módulo routes
const router = require("./routes/index");
// importar módulo db (configuración de sequelize)
const db = require("./config/db");

// Importa dotenv
require("dotenv").config({ path: "variables.env" });

// Configura express
app = express();

// Verificar que la base de datos este conectada correctamente
db.authenticate()
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));

// Habilitar PUG
app.set("view engine", "pug");

// Obtener año actual
app.use((req, res, next) => {
  const year = new Date();
  // A la respuesta del servidor, se le agrega  la propiedad "actualYear" en forma de variable local, para acceder a este valor dentro de las vistas.
  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = "Agencia de Viajes";
  next();
});

// Habilitar body-parser.
app.use(express.urlencoded({ extended: true }));

// Definir la carpeta publica
app.use(express.static("public"));

// Agrega todas las rutas que se definan en el módulo router
app.use("/", router);

// Puerto y host
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log(`el servidor esta funcionando en el puerto ${port}`);
});
