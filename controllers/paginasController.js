const Testimonial = require("../models/Testimoniales");
const Viaje = require("../models/Viaje");

// Creando los controladores para cada página:
exports.paginaInicio = async (req, res) => {
  // Se crea el array "promiseDB" para realizar múltiples consultas a la DB
  const promiseDB = [];
  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));

  try {
    // El método "Promise.all" ejecuta todas las promesas dentro del array "promiseDB" y guarda el resultado en la constante "resultado" en forma de un nuevo array.
    const resultado = await Promise.all(promiseDB);

    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: resultado[0],
      testimoniales: resultado[1],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

exports.paginaViajes = async (req, res) => {
  // Consultar DB, Viaje.findAll() regresa un array de objetos.
  const viajes = await Viaje.findAll();
  res.render("viajes", {
    pagina: "Proximos Viajes",
    // Pasando la consulta hecha a la DB a la vista:
    viajes,
  });
};

// Muestra un viaje por su ID
exports.paginaDetalleViaje = async (req, res) => {
  const { id } = req.params;

  try {
    const viaje = await Viaje.findOne({ where: { id: id } });
    res.render("viaje", {
      pagina: "Informacion Viaje",
      viaje,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();
    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (error) {
    console.log(error);
  }
};
