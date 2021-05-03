const express = require("express");
const paginasController = require("../controllers/paginasController");
const testimonialController = require("../controllers/testimonialController");

const router = express.Router();

router.get("/", paginasController.paginaInicio);
router.get("/nosotros", paginasController.paginaNosotros);
router.get("/viajes", paginasController.paginaViajes);
router.get("/viajes/:id", paginasController.paginaDetalleViaje);
router.get("/testimoniales", paginasController.paginaTestimoniales);
router.post("/testimoniales", testimonialController.guardarTestimonial);

module.exports = router;
