import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Test Endpoint response', () => {
    it('Test main Endpoint response', async () => {
        const response = await request.get('/api')
        expect(response.status).toBe(200)
    })
})
