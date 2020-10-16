// Importando el modelo Testimoniales
const Testimonial = require('../models/Testimoniales');

exports.guardarTestimonial = async (req, res) => {
     // Validar (En Node exists una dependencia llamada express validator que sirve para validaciones, pero al ser el primer proyecto es bueno hacerlo manualmente como práctica)
     
     // Se realiza destructuring a req.body el cual ya fue habilitado en configuración. Los nombres de las variables provienen de testimoniales.pug 
     const {nombre, correo, mensaje} = req.body; 
     // Array de errores, cada error será un objeto en el array.
     const errores = [];
     // "trim" quita los espacios al inicio y al final que puedan estar en el formulario.
     if(nombre.trim() === ''){
          errores.push({mensaje: 'El nombre está vacio'});
     }

     if(correo.trim() === ''){
          errores.push({mensaje: 'El correo está vacio'});
     }

     if(mensaje.trim() === ''){
          errores.push({mensaje: 'El mensaje está vacio'});
     } 
     
     // Verificar si hubo errores. Si el array "errores" tiene por lo menos un espacio, es porque existieron errores.
     if(errores.length > 0){
          // Consultar testimoniales existentes
          // Este código aplica ya que en caso de existir un error se vuelve a cargar la página testimoniales mostrando el error y a su vez es necesario volver a mostrar los testimoniales existentes, para esto la consulta mediante findAll() a la tabla testimoniales en DB.
          const testimoniales = await Testimonial.findAll();

          // Mostrar la vista con errores 
          res.render('testimoniales', {
               pagina: 'Testimoniales',
               errores,
               // Si se llenó correctamente un valor del formulario se agrega por medio de una variable con el mismo nombre que el valor (evitando repetir nombre y valor: nombre: nombre) a la vista, para que el usuario no necesite reescribir esa parte del Formulario, se agrega a la vista "testimoniales" por medio de un value en los inputs con el nombre de la variable y en el textarea con el valor de la variable al final.
               nombre,
               correo,
               mensaje,
               testimoniales
          })
     } else{
          // Almacenarlo en la DB
          try {
               // Se crea una nueva instancia en la tabla testimoniales con los valores del formulario, es muy necesario el "await" de lo contrario se redireccionaria la página antes de haber creado la nueva instancia en la tabla de testimoniales y por tanto, no se mostraría el nuevo testimonial añadido a pesar de si haberse añadido a la tabla testimoniales.
               await Testimonial.create({
                    nombre,
                    correo,
                    mensaje
               });
               // Si todo sale bien redirecciona a la página "testimoniales" mostrando el nuevo testimonial recién añadido.
               res.redirect('/testimoniales');
          } catch (error) {
                console.log(error);
          }

     }
     
}