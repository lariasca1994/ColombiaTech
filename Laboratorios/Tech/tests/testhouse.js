const request = require('supertest');
const app = require('../index')

const objecToTest1 = {

    "address":"cll 5-57 ",
    "city": "Agua de Dios",
    "state":"Cundinamarca",
    "size": "150",
    "type": "apto",
    "price":"160000000",
    "code": "123459"

}

describe('POST /house', () => {
    it('create a new post test ', async () => {

        const response = await request(app).post('/house').send(objecToTest1)
        console.log(response)
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







