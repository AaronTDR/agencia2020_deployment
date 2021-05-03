const Testimonial = require("../models/Testimoniales");

exports.guardarTestimonial = async (req, res) => {
  // Validar (En Node exists una dependencia llamada express validator que sirve para validaciones, pero al ser el primer proyecto es bueno hacerlo manualmente como práctica)

  // Se realiza destructuring a req.body el cual ya fue habilitado en configuración. Los nombres de las variables provienen de testimoniales.pug
  const { nombre, correo, mensaje } = req.body;
  // Array de errores, cada error será un objeto en el array.
  const errores = [];
  if (nombre.trim() === "") {
    errores.push({ mensaje: "El nombre está vacio" });
  }

  if (correo.trim() === "") {
    errores.push({ mensaje: "El correo está vacio" });
  }

  if (mensaje.trim() === "") {
    errores.push({ mensaje: "El mensaje está vacio" });
  }

  // Verificar si hubo errores.
  if (errores.length > 0) {
    // Consultar testimoniales existentes
    // En caso de existir un error se vuelve a cargar la página testimoniales mostrando el error y a su vez es necesario volver a mostrar los testimoniales existentes, para esto la consulta mediante findAll() a la tabla testimoniales en DB.
    const testimoniales = await Testimonial.findAll();

    // Mostrar la vista con errores
    res.render("testimoniales", {
      pagina: "Testimoniales",
      errores,
      // Si se llenó correctamente un valor del formulario se agrega por medio de una variable con el mismo nombre que el valor (evitando repetir nombre y valor: nombre: nombre)
      nombre,
      correo,
      mensaje,
      testimoniales,
    });
  } else {
    // Almacenarlo en la DB
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje,
      });
      res.redirect("/testimoniales");
    } catch (error) {
      console.log(error);
    }
  }
};
