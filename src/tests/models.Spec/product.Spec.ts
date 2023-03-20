import db from '../../database'
import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'

const productModel = new ProductModel()

describe('Test Product Model', () => {
    describe('Test methods exist', () => {
        it('Should have createP roduct method', () => {
            expect(productModel.create).toBeDefined()
        })

        it('Should have GetAllProducts method', () => {
            expect(productModel.getAllProducts).toBeDefined()
        })

        it('Should have GetOneproduct method', () => {
            expect(productModel.getOne).toBeDefined()
        })

        it('Should have GetProByCate method', () => {
            expect(productModel.getProByCate).toBeDefined()
        })

        it('Should have UpdateProduct method', () => {
            expect(productModel.updateProduct).toBeDefined()
        })

        it('Should have DeleteProduct method', () => {
            expect(productModel.deleteProduct).toBeDefined()
        })
    })

    describe('Test ProductModel functionality', () => {
        const product = {
            name: 'Keyb-1',
            price: '1000',
            category: 'Keyborads',
        } as Product

        beforeAll(async () => {
            const createP = await productModel.create(product)
            product.id = createP?.id
        })
        afterAll(async () => {
            const connection = await db.connect()
            const sql = `DELETE from products; ALTER SEQUENCE products_id_seq RESTART WITH 1;`
            await connection.query(sql)
            connection.release
        })

        it('Create function, should return created prodcut', async () => {
            const createdProduct = await productModel.create({
                name: 'keyb-2',
                price: '1000',
                category: 'Keyborads',
            } as Product)

            expect(createdProduct).toEqual({
                id: createdProduct?.id,
                name: 'keyb-2',
                price: '1000',
                category: 'Keyborads',
            } as Product)
        })
        it('GetAll function, should return all products from DB', async () => {
            const products = await productModel.getAllProducts()
            expect(products.length).toBe(2)
        })
        it('GetByID function, should return prodcut with passed id, from DB', async () => {
            const returnedProduct = await productModel.getOne(
                product?.id as unknown as string
            )
            expect(returnedProduct?.id).toBe(product.id)
            expect(returnedProduct?.name).toBe(product.name)
            expect(returnedProduct?.price).toBe(product.price)
            expect(returnedProduct?.category).toBe(product.category)
        })
        it('GetByCategory function, should return prodcut with passed category, from DB', async () => {
            const returnedProduct = await productModel.getProByCate(
                product.category
            )
            expect(returnedProduct?.id).toBe(product.id)
            expect(returnedProduct?.name).toBe(product.name)
            expect(returnedProduct?.price).toBe(product.price)
            expect(returnedProduct?.category).toBe(product.category)
        })
        it('Update function, should return updated product with passed id, from DB', async () => {
            const up = { name: 'TV-1', price: '8000', category: 'TV' }
            const updatedProduct = await productModel.updateProduct(
                product.id as unknown as string,
                up.name,
                up.price,
                up.category
            )
            expect(updatedProduct?.id).toBe(product.id)
            expect(updatedProduct?.name).toBe('TV-1')
            expect(updatedProduct?.price).toBe('8000')
            expect(updatedProduct?.category).toBe('TV')
        })
        it('Delete function, should delete product with passed id, from DB', async () => {
            const deletedProduct = await productModel.deleteProduct(
                product?.id as unknown as string
            )
            expect(deletedProduct?.id).toBe(product.id)
        })
    })
})
