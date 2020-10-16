const express = require('express');

// Importando controladores de la carpeta paginasController
const paginasController = require('../controllers/paginasController');
// Importar controlador de la carpeta testimonialController 
const testimonialController = require('../controllers/testimonialController');

const router = express.Router();

// Todas las rutas se agregan a la const router para después importarlas a "app" del archivo de configuración.
router.get('/', paginasController.paginaInicio);

router.get('/nosotros', paginasController.paginaNosotros);

router.get('/viajes', paginasController.paginaViajes);
// Router para información detallada de cada viaje,":id"  puede tomar el nombre que uno deseé, solo se prepara para recibir una url cambiante.
router.get('/viajes/:id', paginasController.paginaDetalleViaje);

router.get('/testimoniales', paginasController.paginaTestimoniales);
//  Envío de formulario en "Testimoniales.pug"
router.post('/testimoniales', testimonialController.guardarTestimonial);


module.exports = router;
