const xlsx = require('xlsx');//importar la libreria para leer excel
require('dotenv').config()
const bcrypt = require('bcrypt');

const DB_URL = process.env.DB_URL || '';
const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect(DB_URL)

const UserSchema = require('./models/User')



const workbook = xlsx.readFile('datos.xlsx')
const sheet_list = workbook.SheetNames
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_list[0]])

// for (const user of data) {

//     const hashedPassword = bcrypt.hashSync(user.password, 10)

//     user.password = hashedPassword

// }


// UserSchema.insertMany(data).then(() => {

//     console.log("información subida exitosamente")

// }).catch(err => console.log("error subiendo la información", err))

// console.log(data)

for(const user of data){
    // Hasheamos la clave
    user.email = user.email.trim().toLowerCase()
    const hashedPassword = bcrypt.hashSync(user.password, 10)
    // Seteamos la contraseña con la nueva hasheada
    user.password = hashedPassword

    UserSchema({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        id: user.id,
        password: hashedPassword
    }).save().then((result) => {
        console.log("Usuario subido:", user.name)
    }).catch((err) => {
        console.log("Error subiendo el usuario", user.name)
    })
}