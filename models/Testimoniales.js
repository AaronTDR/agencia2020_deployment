// Importar sequelize
const Sequelize = require('sequelize');
// Importando la instancia en del archivo config
const db = require('../config/db');

// Definiendo el modelo. la constante "Testimoniales" recibe como valor la instancia "db" con el método "define", que como primer parámetro recibe el nombre de la tabla "testimoniales" y segundo parámetro un objeto de configuración(En esta practica se tiene una tabla ya hecha en la DB, pero usualmente es aquí donde con la configuración se crea la tabla en la DB):
const Testimonial = db.define('testimoniales', {
     nombre:{
          type: Sequelize.STRING
     },
     correo:{
          type: Sequelize.STRING
     },
     mensaje:{
          type: Sequelize.STRING
     }
});
module.exports = Testimonial;