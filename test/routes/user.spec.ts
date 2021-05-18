import request from "supertest";
import createServer from '../../config/server';
import Server from '../../config/server';
const nock = require('nock');

let server: Server;

beforeAll(async () => {

    server = await new createServer()
    server.listen();
})

describe('User test', () => {

    it('GET - User first test', () => {

        request(server.app)
            .get("/users/new")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)


    });

    it('GET - Users service', () => {

        request(server.app)
            .get("/users/api")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    
    });
    
    it('GET - User login', () => {
    
    
        request(server.app)
            .get("/users/login")
            .query({user: 'DavidSalguero', password:'12345'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    
    });
    
    it('GET - User login fail', async() => {
    
    
        const response = await request(server.app)
            .get("/users/login")
            .query({user: 'DavidSalguero', password:'1'})
            .set('Accept', 'application/json');
        
        expect(response.status).toEqual(404);
        expect(response.body.msg).toEqual("Wrong user credentials");
    
    });
})


