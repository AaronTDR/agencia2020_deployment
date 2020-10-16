// Importando el modelo Viaje
const Testimonial = require('../models/Testimoniales');
const Viaje = require('../models/Viaje');

// Creando los controladores para cada página:
exports.paginaInicio = async (req, res) => {  // req - lo que enviamos y res - lo que express nos responde.
     // Se crea el array "promiseDB" para realizar múltiples consultas a la DB 
     const promiseDB = [];
     promiseDB.push(Viaje.findAll({ limit: 3}));
     promiseDB.push(Testimonial.findAll({ limit: 3}));
     

     try {
          // El método "Promise.all" ejecuta todas las promesas dentro del array "promiseDB" y y guarda el resultado en la constante "resultado" en forma de un nuevo array. El ahora array "resultado" guarda los valores en la misma posición  que tenian en "promiseDB" solo que ahora ya resueltos.
          const resultado = await Promise.all(promiseDB);

     res.render('inicio', {
          pagina:'Inicio', 
          clase: 'home',
          // Accediendo a los valores de "resultado" y asignándole a variables para ser utilizados en las vistas.
          viajes: resultado[0],
          testimoniales: resultado[1]
     });
     } catch (error) {
          console.log(error);
     }

}

exports.paginaNosotros = (req, res) => {  // req - lo que enviamos y res - lo que express nos responde.
     // El método ".render()" busca el nombre del archivo ingresado como primer parámetro para mostrarlo. Como segundo parámetro puede recibir un objeto "{}" con la información que deseemos mandar a la vista.
     res.render('nosotros', {
          pagina: 'Nosotros'
     });
}

exports.paginaViajes = async (req, res) => {  // req - lo que enviamos y res - lo que express nos responde.
     // Consultar DB, Viaje.findAll() regresa un array de objetos.
     const viajes = await Viaje.findAll();
     

     // El método ".render()" busca el nombre del archivo ingresado como primer parámetro para mostrarlo. Como segundo parámetro puede recibir un objeto "{}" con la información que deseemos mandar a la vista.
     res.render('viajes', {
          pagina: 'Proximos Viajes',
          // Pasando la consulta hecha a la DB a la vista:
          viajes
     });
}

// Muestra un viaje por su ID
exports.paginaDetalleViaje = async (req, res) =>{
     //  Forma  1
     // En la vista "viajes" se indica la renderizacion "viaje.id", por tanto req.params obtiene como valor dicho "id". En routes se agrega una ruta flexible con nombre "id" y es pedido con el método de sequelize findByPk()
     /*const viaje = await Viaje.findByPk(req.params.id)
     //console.log('REQ.PARAMS.ID===>',viaje);
     res.render('viaje',{
          viaje
     });
     */


     // Forma 2
     // Destructuring al comando req.params que pide un objeto que contiene valores de parámetros analizados a partir de la ruta de URL, en la vista "viajes" se pide el parámetro id.
    const {id} = req.params;
    //console.log('DESTRUCTURING===>',id);

    try {
         const viaje = await Viaje.findOne({where : { id : id }});
          res.render('viaje', {
               pagina: 'Informacion Viaje',
               viaje
          })
    } catch (error) {
         console.log(error)
    }
     
    
}

exports.paginaTestimoniales = async (req, res) => {  // req - lo que enviamos y res - lo que express nos responde.
     
     try {
          // Consultamos la tabla Testimoniales de la DB. findAll() retorna un arreglo.
          const testimoniales = await Testimonial.findAll();
          // El método ".render()" busca el nombre del archivo ingresado como primer parámetro para mostrarlo. Como segundo parámetro puede recibir un objeto "{}" con la información que deseemos mandar a la vista.
     res.render('testimoniales', {
          // A esta variable local, como ya está dentro del "res" solo hace falta poner su nombre(key) y valor.
          pagina: 'Testimoniales',
          testimoniales
     });
     } catch (error) {
          console.log(error);
     }
     
}

