import { v4 as uuidv4 } from "uuid";

export const users = [
    {
        userId: uuidv4(),
        name: 'David Salguero',
        email: 'blabla@blablabla.com',
        password: '12345'
    },
    {
        userId: uuidv4(),
        name: 'Pep Perez',
        email: 'pepe@blablabla.com',
        password: '54321'
    },
    {
        userId: uuidv4(),
        name: 'Paco Sanchez',
        email: 'paco@blablabla.com',
        password: 'asdf'
    }
]