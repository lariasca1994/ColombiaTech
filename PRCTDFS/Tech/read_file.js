const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/deparments',(req,res)=>{
 fs.readFile('department.json','utf8',(err, data)=>{
    if(err){
     res.status(500).send({'status':'"error',"message":"error obteniendo la información"})
     return;
    }

   res.send(JSON.parse(data));

 })

})


router.post('/department',(req,res)=>{
fs.readFile('department.json','utf8',(err, data)=>{
  var deparments =JSON.parse(data)
  deparments.push(req.body)
  fs.writeFile('department.json',JSON.stringify(deparments), (err)=>{
    if(err){
    res.send(err)
    return

      }

    res.send(req.body)

    })

  })


})


module.exports= router