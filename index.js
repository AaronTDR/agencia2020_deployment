// Importar express
const express = require('express');
// Importar módulo routes
const router = require('./routes/index');
// importar módulo db (configuración de sequelize)
const db = require('./config/db');

// Importar dotenv para usar variables de entorno en la sección de puerto en "app.listen()"
require('dotenv').config({path: 'variables.env'});

//permite configurar express 
app = express();

// Verificar que la base de datos este conectada correctamente
db.authenticate() 
      .then(() => console.log('Base de datos conectada'))
      .catch(error => console.log(error));

// Definir puerto (En el curso habilitaron este puerto antes y después quedó como código descartado)
//const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug')

// Obtener el año actual
app.use((req, res, next) => {
      const year = new Date();
      // Al objeto res, que es la respuesta del servidor, se le agrega  la propiedad "actualYear" en forma de variable local, para acceder a este valor dentro de las vistas.
      res.locals.actualYear = year.getFullYear();
      res.locals.nombresitio = 'Agencia de Viajes';
      next();
});

// Habilitar body-parser para leer los datos del formulario. Ejemplo: console.log(req.body)
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

/* Agregar router. Agrega las routers a app desde el módulo routes. Explicación:
      -desde la página principal "('/')" agrega todas las rutas que se definan en el módulo router */
app.use('/', router)


// Puerto y host para la app. 
// La variable "host" recibe como valor la variable de entorno "HOST" si estamos en desarrollo o en caso de estar en producción, recibe de valor la dirección "0.0.0.0" para que "Heroku" le asigne una dirección valida.
const host = process.env.HOST || '0.0.0.0';
// La variable "port" recibe como valor una variable de entorno que no fue creada en el proyecto, pero que creará "Heroku" si estamos en producción, si estamos en desarrollo recibe como valor 3000  como puerto.
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
     console.log(`el servidor esta funcionando en el puerto ${port}`);
});
