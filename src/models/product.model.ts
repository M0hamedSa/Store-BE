import db from '../database'
import Product from '../types/product.type'

class ProductModel {
    //Create Product
    async create(p: Product): Promise<Product> {
        try {
            const connection = await db.connect()

            const sql = `INSERT INTO products (name, price, category)
        values ($1, $2, $3) returning id, name, price, category`

            const result = await connection.query(sql, [
                p.name,
                p.price,
                p.category,
            ])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Unable to create (${p.name}): ${(error as Error).message}`
            )
        }
    }

    // //Get All products
    async getAllProducts(): Promise<Product[]> {
        try {
            const connection = await db.connect()

            const sql = `SELECT id, name, price, category FROM products`

            const result = await connection.query(sql)
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`Retrieving error ${(error as Error).message})`)
        }
    }
    // //Get products by category
    async getProByCate(category: string): Promise<Product | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT category FROM products WHERE category=$1`
            const result = await connection.query(sql, [category])
            if (result.rows.length) {
                const sql = `SELECT * FROM products WHERE category=$1`
                const result = await connection.query(sql, [category])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `Unable to get products with category-${category}, ${
                    (error as Error).message
                })`
            )
        }
    }
    // //Get Specific product
    async getOne(id: string): Promise<Product | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT id FROM products WHERE id=$1`
            const result = await connection.query(sql, [id])
            if (result.rows.length) {
                const sql = `SELECT * FROM products WHERE id=$1`
                const result = await connection.query(sql, [id])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `Unable to get product with ID:${id}, ${
                    (error as Error).message
                })`
            )
        }
    }
    // //Update product
    async updateProduct(
        id: string,
        name: string,
        price: string,
        category: string
    ): Promise<Product | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT id FROM products WHERE id=$1`
            const result = await connection.query(sql, [id])
            if (result.rows.length) {
                const sql = `UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING id, name, price, category`
                const result = await connection.query(sql, [
                    name,
                    price,
                    category,
                    id,
                ])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `Unable to update product: ${name} , ${
                    (error as Error).message
                })`
            )
        }
    }

    // //Delete product
    async deleteProduct(id: string): Promise<Product | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT id FROM products WHERE id=$1`
            const result = await connection.query(sql, [id])
            if (result.rows.length) {
                const sql = `DELETE FROM products WHERE id=$1 RETURNING id, name, price, category`
                const result = await connection.query(sql, [id])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `Unable to delete product ${id}, ${(error as Error).message})`
            )
        }
    }
}

export default ProductModel
