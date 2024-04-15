const mongoose = require('mongoose') 
import('node-fetch').then(({ default: fetch }) => {
  // Aquí puedes usar la función `fetch`
});//para el consumo de la API Externa
// Creando el modelo de Casas
const HouseSchema = new mongoose.Schema({
   address: {
      type: String, 
      required: true,

   },
   
    city: {
     required: true,
     type: String,
     validate: {
         validator: async function(city) {
           // Validacion del departamento
            var response = await fetch('https://api-colombia.com/api/v1/City');
           var cities = await response.json()
           return cities.some(object => object.name.toUpperCase().includes(city.toUpperCase()));
         },
        message: props => `${props.value} no es una Ciudad de Colombia!`
      }
   },
  state: {
     required: true,
     type: String,
     validate: {
         validator: async function(state) {
           // Validacion del departamento
           var response = await fetch('https://api-colombia.com/api/v1/Department');
            var departments = await response.json()
           return departments.some(department => department.name.toUpperCase().includes(state.toUpperCase()));
         },
         message: props => `${props.value} no es un Departamento de Colombia!`
       }
 },
   size: {
       type: Number, 
      required: true
    },
   type: {
       type: String, 
       required: true
   },
    price: {
      type: String
   },
   code: {
       type: String,
       required:true,
       unique:true
     }
})

module.exports = mongoose.model('house', HouseSchema) 