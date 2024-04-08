const fs = require('fs');//Libreria para leer los archivos del sistema

const content = "Prueba de contenido realizada para manejar archivos"

fs.writeFileSync('archivo.txt', content,(err)=>{
  if(err){
    console.log(err);
    return;
  }

   console.log('Archivo creado exitosamente');


})