// Importar sequelize
const Sequelize = require('sequelize');
// Importar dotenv. A diferencia de otras dependencias no necesita asignarse a una variable al importar dentro de un archivo. En ".config({})" se le indica donde encontrar al archivo en la oc, por tanto, también se hace uso de la dependencia "path"
require('dotenv').config({path: 'variables.env'});

// Se crea nueva instancia  usando estructura de clase, primer parámetro = nombre DB, segundo parámetro = usuario, tercer parámetro = password, cuarto parámetro = configuraciones de sequelize para conectar con la DB. La extension "process.env" es utilizada por la dependencia "dotenv" para leer sus variables antes de cada variable.
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
     host: process.env.DB_HOST,
     port: process.env.DB_PORT,
     dialect: 'mysql',
     define: {
          timestamps: false
     },
     pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
     }, 

});

module.exports = db;