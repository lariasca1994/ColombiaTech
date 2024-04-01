const fs = require('fs')
const express = require('express');
const router = express.Router();

router.get('/departments', (req, res) => {
    fs.readFile('department.json', 'utf8', (err, data) => {
        if(err){        
            res.status(500).send({'status': "error", "mssage": "Error obteniendo la informacion"})
            return;
        }        
        res.send(JSON.parse(data))
    })
})

module.exports = router