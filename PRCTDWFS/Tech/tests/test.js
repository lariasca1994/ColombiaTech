const request = require('supertest');
const app = require('../index')

const objecToTest = {
    "id": 453332558,
    "name": "Merlina",
    "lastname": "marinez",
    "email": "mmar@gmail.com",
    "password": "miprueba2"

}

const objecToTest1 = {
    "code": "12344444414",
    "address":"cll 5-57",
    "city": "Agua de Dios",
    "state":"Cundinamarca",
    "size": 150,
    "type": "apto",
    "price":"160000000"
    

}

let Housecode;

let userId;
let houseId
let token;


describe('GET/', () => {
    it('response with status 200', async () => {
        const response = await request(app).get('/');
        //console.log(response)
        expect(response.status).toBe(200);
        //expect(response.text).toBe('Hello world');

    })

    it('response with status 200', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello world');

    })



})

describe('POST /user', () => {
    it('create a new post test ', async () => {

        const response = await request(app).post('/user').send(objecToTest)

        userId = response.body._id;


        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body.name).toBe(objecToTest.name)
        expect(response.body.lastname).toBe(objecToTest.lastname)
        expect(response.body.email).toBe(objecToTest.email)

    })

})


describe('GET /user/:id', () => {
    it('responds with an Object that contains an specific user', async () => {

        //const id = "5dfc8e7c7065f1bca07dab5"
        const response = await request(app).get('/user/' + userId);


        expect(response.status).toBe(200);
        expect(typeof response.body === "object").toBe(true);
        expect(response.body).toHaveProperty('_id')
        expect(response.body.name).toBe(objecToTest.name)
        expect(response.body.lastname).toBe(objecToTest.lastname)
        expect(response.body.email).toBe(objecToTest.email)
    })
})


describe('POST / LOGIN', () => {
    it('login with email and password', async () => {

       
        const response = await request(app).post('/login').send(objecToTest)
        
        token = response.body.token;
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        expect(response.body.status).toBe("success")
    })

    // it('Error login with email and password', async () => {
    //     const user = {
    //         "email": "mmar@gmail.com",
    //         "password": "miprueba2"
    //     }

    //     const response = await request(app).post('/login').send(user)

    //     expect(response.statusCode).toBe(401)
    //     expect(response.body).not.toHaveProperty('token')
    //     expect(response.body.status).toBe("error")
    // })


})




// describe('GET /user', () => {

//     it('response with array Object that contain an specific user', async () => {
//         const response = await request(app).get('/user');
//         const objectToTest = {
//             "_id": "65cff9cef291c7b3c40d7b82",
//             "id": 8745156161,
//             "name": "Pepito",
//             "lastname": "Perez",
//             "email": "pepitop@correo.com",
//             "password": "$2b$10$T17pHXJLOZ7tiu33vXa.Oejk.UP0YxWojZk6gh/iC7GEK/wAVDj7y",
//             "__v": 0
//         }
//         expect(Array.isArray(response.body)).toBe(true);
//         expect(response.body).toEqual(expect.arrayContaining([objectToTest]))

//     })

// })



describe('POST /delete', () => {
    it('Success delete with _id', async () => {        
        const response = await request(app).delete('/user/'+ userId)
                                        .set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe("success")
    })
})




describe('POST /house', () => {
    it('create a new post test ', async () => {

        const response = await request(app).post('/house').send(objecToTest1)
        
        Housecode = response.body._id;

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body.address).toBe(objecToTest1.address)
        expect(response.body.city).toBe(objecToTest1.city)
        expect(response.body.state).toBe(objecToTest1.state)
        expect(response.body.size).toBe(objecToTest1.size)
        expect(response.body.type).toBe(objecToTest1.type)
        expect(response.body.price).toBe(objecToTest1.price)
        expect(response.body.code).toBe(objecToTest1.code)
    })

})

describe('GET /house/:code', () => {
    it('responds with an Object that contains an specific House', async () => {
        
        const response = await request(app).get('/house/' + Housecode);
        Housecode = response.body.code;
        expect(response.statusCode).toBe(200)
        expect(typeof response.body === "object").toBe(true);
        expect(response.body).toHaveProperty('_id')
        expect(response.body.address).toBe(objecToTest1.address)
        expect(response.body.city).toBe(objecToTest1.city)
        expect(response.body.state).toBe(objecToTest1.state)
        expect(response.body.size).toBe(objecToTest1.size)
        expect(response.body.type).toBe(objecToTest1.type)
        expect(response.body.price).toBe(objecToTest1.price)
        expect(response.body.code).toBe(objecToTest1.code)
    })
})


describe('/house/:code', () => {
    it('Success delete with _id', async () => { 
             
        const response = await request(app).delete('/house/'+ Housecode)
        Housecode = response.body.code;  
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe("success")
    })
})