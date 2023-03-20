import db from '../../database'
import OrderModel from '../../models/order.model'
import Order from '../../types/order.type'
import User from '../../types/user.type'
import UserModel from '../../models/user.model'
import Product from '../../types/product.type'
import ProductModel from '../../models/product.model'
import Order_Product from '../../types/order_product.type'

const productModel = new ProductModel()
const userModel = new UserModel()
const orderModel = new OrderModel()

describe('Test Order Model', () => {
    describe('Test methods exist', () => {
        it('Should have create order method', () => {
            expect(orderModel.createOrder).toBeDefined()
        })

        it('Should have AddProducts method', () => {
            expect(orderModel.addProduct).toBeDefined()
        })

        it('Should have getOrderByID method', () => {
            expect(orderModel.getOne).toBeDefined()
        })
        it('Should have deleteAddProduct method', () => {
            expect(orderModel.deleteAddProduct).toBeDefined()
        })
    })

    describe('Test OrderModel functionality', () => {
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

        it('Create function, should return created order', async () => {
            const createdOrder = await orderModel.createOrder({
                user_id: user.id as unknown as string,
                status: 'Active',
            } as Order)
            expect(createdOrder).toEqual({
                id: createdOrder?.id,
                user_id: '1',
                status: 'Active',
            } as Order)
        })
        it('AddProduct function, should return added order', async () => {
            const addedProduct = await orderModel.addProduct({
                quantity: 10,
                order_id: '1',
                product_id: '1',
            } as Order_Product)
            expect(addedProduct).toEqual({
                id: addedProduct?.id,
                quantity: 10,
                order_id: '1',
                product_id: '1',
            } as Order_Product)
        })
        it('GetByID function, should return added product with passed id, from DB', async () => {
            const returnedaddProduct = await orderModel.getOne(
                order?.id as unknown as string
            )
            expect(returnedaddProduct?.id).toBe(order.id)
            expect(returnedaddProduct?.user_id).toBe(order.user_id)
            expect(returnedaddProduct?.status).toBe(order.status)
        })
        it('Delete function, should delete ordered product with passed id, from DB', async () => {
            //delete ordered product with id 1
            const deletedorderedProduct = await orderModel.deleteAddProduct(
                user.id as unknown as string
            )
            expect(deletedorderedProduct?.id).toBe(product.id)
        })
    })
})
