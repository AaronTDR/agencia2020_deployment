// Importar sequelize
const Sequelize = require('sequelize');
// Importando la instancia en del archivo config
const config = require('../config/db');

// Definiendo el modelo. la constante "Viaje" recibe como valor la instancia "db" con el método "define", que como primer parámetro recibe el nombre de la tabla "viajes" y segundo parámetro un objeto de configuración(En esta practica se tiene una tabla ya hecha en la DB, pero usualmente es aquí donde con la configuración se crea la tabla en la DB):
const Viaje = config.define('viajes',{
     // Se deben definir aquí todas las columnas a excepción de la columna "id"
      titulo: {
          type: Sequelize.STRING
      },
      precio: {
          type: Sequelize.STRING
     },
     fecha_ida: {
          type: Sequelize.DATE
     },
     fecha_vuelta: {
          type: Sequelize.DATE
     },
     imagen: {
          type: Sequelize.STRING
     },
     descripcion: {
          type: Sequelize.STRING
     },
     disponibles: {
          type: Sequelize.STRING
     }
     
});

module.exports = Viaje;