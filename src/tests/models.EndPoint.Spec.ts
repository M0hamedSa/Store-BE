import supertest from 'supertest'
import db from '../database'
import User from '../types/user.type'
import UserModel from '../models/user.model'
import app from '../index'
import Product from '../types/product.type'
import ProductModel from '../models/product.model'
import Order from '../types/order.type'
import OrderModel from '../models/order.model'
import Order_Product from '../types/order_product.type'

const orderModel = new OrderModel()
const productModel = new ProductModel()
const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('Test API EndPoints ', () => {
    const product = {
        name: 'Keyb-1',
        price: '1000',
        category: 'Keyborads',
    } as Product

    const user = {
        username: 'mohsa',
        first_name: 'mohamed',
        last_name: 'saleh',
        password: '1234',
    } as User

    const order = {
        user_id: '1' as unknown as string,
        status: 'Active',
    } as Order

    beforeAll(async () => {
        const create = await userModel.create(user)
        user.id = create?.id
        const createP = await productModel.create(product)
        product.id = createP?.id
        const createO = await orderModel.createOrder(order)
        order.id = createO?.id
    })
    afterAll(async () => {
        const connection = await db.connect()
        const sql = `DELETE from order_product; ALTER SEQUENCE order_product_id_seq RESTART WITH 1; DELETE from products; ALTER SEQUENCE products_id_seq RESTART WITH 1; DELETE from orders; ALTER SEQUENCE orders_id_seq RESTART WITH 1; DELETE from users; ALTER SEQUENCE users_id_seq RESTART WITH 1;`
        await connection.query(sql)
        connection.release
    })

    describe('Test Authenticate method', () => {
        it('Should be able to Authenticate to get token ', async () => {
            const res = await request
                .post('/api/users/auth')
                .set('Content-type', 'application/json')
                .send({
                    username: 'mohsa',
                    password: '1234',
                })
            expect(res.status).toBe(200)
            const { token: userToken } = res.body.data
            const { id, username } = res.body.data.user
            expect(id).toEqual(user.id)
            expect(username).toBe('mohsa')
            token = userToken
        })
        it('Error should be occurred (wrong login data)', async () => {
            const res = await request
                .post('/api/users/auth')
                .set('Content-type', 'application/json')
                .send({
                    username: 'wrong',
                    password: 'wrong',
                })
            expect(res.status).toBe(401)
        })
    })
    describe('Test API Endpoint for orders', () => {
        it('Should create new order', async () => {
            const res = await request
                .post('/api/orders')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    user_id: '1',
                    status: 'Active',
                } as Order)
            expect(res.status).toBe(200)
            const { user_id, status } = res.body.data
            expect(user_id).toBe('1')
            expect(status).toBe('Active')
        })
        it('Should get order by ID from DB', async () => {
            const res = await request
                .get(`/api/orders/${order.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.user_id).toBe('1')
            expect(res.body.data.status).toBe('Active')
        })
        it('Should add product to order', async () => {
            const res = await request
                .post(`/api/orders/${user.id}/products`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    quantity: 10,
                    order_id: '1',
                    product_id: '1',
                } as Order_Product)
            expect(res.status).toBe(200)
            // const {user_id,status} = res.body.data
            // expect(user_id).toBe('1')
            // expect(status).toBe('Active')
        })
        it('Should delete ordered product by ID from DB', async () => {
            const res = await request
                //delete ordered product i just created with id 2
                .delete(`/api/orders/${order.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.id).toBe(1)
            expect(res.body.data.quantity).toBe(10)
            expect(res.body.data.product_id).toBe('1')
            expect(res.body.data.order_id).toBe('1')
        })
    })

    describe('Test API Endpoint for products', () => {
        it('Should create new product', async () => {
            const res = await request
                .post('/api/products')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Keyb-2',
                    price: '1500',
                    category: 'Keyborads',
                } as Product)

            expect(res.status).toBe(200)

            const { name, price, category } = res.body.data
            expect(name).toBe('Keyb-2')
            expect(price).toBe('1500')
            expect(category).toBe('Keyborads')
        })
        it('Should get all products from DB', async () => {
            const res = await request
                .get('/api/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.length).toBe(2)
        })
        it('Should get product by ID from DB', async () => {
            const res = await request
                .get(`/api/products/${product.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.name).toBe('Keyb-1')
            expect(res.body.data.price).toBe('1000')
        })
        it('Should get product by category from DB', async () => {
            const res = await request
                .get(`/api/products/category/${product.category}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.name).toBe('Keyb-1')
            expect(res.body.data.price).toBe('1000')
        })
        it('Should update product by ID from DB', async () => {
            const res = await request
                .patch(`/api/products/${product.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...product,
                    name: 'Keyb-1update',
                    price: '2000',
                } as Product)
            expect(res.status).toBe(200)
            const { name, price } = res.body.data
            expect(name).toBe('Keyb-1update')
            expect(price).toBe('2000')
        })
        it('Should delete product by ID from DB', async () => {
            const res = await request
                .delete(`/api/products/2`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.id).toBe(2)
            expect(res.body.data.name).toBe('Keyb-2')
        })
    })

    describe('Test API Endpoint for users', () => {
        it('Should create new user', async () => {
            const res = await request
                .post('/api/users')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    username: 'test142',
                    first_name: 'mohamed2',
                    last_name: 'saleh2',
                    password: '1234',
                } as User)

            expect(res.status).toBe(200)

            const { username, first_name, last_name } = res.body.data
            expect(username).toBe('test142')
            expect(first_name).toBe('mohamed2')
            expect(last_name).toBe('saleh2')
        })
        it('Should get all users from DB', async () => {
            const res = await request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.length).toBe(2)
        })
        it('Should get user by ID from DB', async () => {
            const res = await request
                .get(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.username).toBe('mohsa')
            expect(res.body.data.first_name).toBe('mohamed')
        })
        it('Should update user by ID from DB', async () => {
            const res = await request
                .patch(`/api/users/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    ...user,
                    first_name: 'mohamedupdate',
                    last_name: 'salehupdate',
                } as User)
            expect(res.status).toBe(200)
            const { first_name, last_name } = res.body.data
            expect(first_name).toBe('mohamedupdate')
            expect(last_name).toBe('salehupdate')
        })
        it('Should delete user by ID from DB', async () => {
            const res = await request
                //delete user i just created with id 2
                .delete(`/api/users/2`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(res.status).toBe(200)
            expect(res.body.data.id).toBe(2)
            expect(res.body.data.first_name).toBe('mohamed2')
        })
    })
})
