const express = require('express');
 const router = express.Router();
 const HouseSchema = require ('../models/House');
 const multer = require ('multer');
 const cors = require('cors');

 const app = express();

// Agrega el middleware de CORS para permitir solicitudes desde cualquier origen
app.use(cors());

 router.get('/house', async (req, res)=>{
 //traer todas las casas
 let houses = await HouseSchema.find();
 res.json(houses)
 
 })

 router.get('/house/:code', async(req, res)=>{
 // traer una casa por código específico
var code = req.params.code
 let house = await HouseSchema.findById(code);
 res.json(house)

})


 router.post('/house',async (req, res)=> {
 // Crear una Casa
 console.log(req.body)
 let house = HouseSchema({
    address: req.body.address,
     city: req.body.city,
     state:req.body.state,
     size: req.body.size,
     type: req.body.type,
     price:req.body.price,
     code: req.body.code
 })

 house.save().then((result) =>{
     res.send(result)
 }).catch((err) => {
      res.send(err.message)

 })

 })

router.patch('/houses/:code',(req,res) => {
  //actualiza la una casa
   //cuando viene por la url del servicio web params
   var code = req.params.code

   //cuando viene por el body se usa el body
 var updateHouse = {
    address: req.body.address,
    city: req.body.city,
    state:req.body.state,
    size: req.body.size,
    type: req.body.type,
    price:req.body.price,
    code: req.body.price

  }

  HouseSchema.findByIdAndUpdate(code, updateHouse,{new:true}).then((result) =>{
       res.send(result)
   }).catch((error) =>{
     console.log(error)
     res.send("Error Actualizando los datos de la casa")

  })

 })


 router.delete('/house/:code',(req, res)=> {

   var code =  req.params.code
  // para eliminar por cualquier parametro
  
  HouseSchema.deleteOne({code:code}).then(() =>{
      res.json({"status": "success", "message": "House deleted successfully"})
   }).catch(() =>{
    console.log(error)
    res.json({"status": "failed", "message": "Error deleting House"})

  })

 })


 module.exports = router