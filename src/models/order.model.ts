import db from '../database'
import Order from '../types/order.type'
import Order_Product from '../types/order_product.type'

class OrderModel {
    async createOrder(op: Order): Promise<Order> {
        try {
            const connection = await db.connect()

            const sql = `INSERT INTO orders (user_id, status)
        values ($1, $2) returning id, user_id, status`
            const result = await connection.query(sql, [op.user_id, op.status])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Unable to create order (${op.user_id}): ${
                    (error as Error).message
                }`
            )
        }
    }

    async addProduct(op: Order_Product): Promise<Order_Product> {
        try {
            const connection = await db.connect()

            const sql = `INSERT INTO order_product (quantity, order_id, product_id)
        values ($1, $2, $3) returning id, quantity, order_id, product_id`
            const result = await connection.query(sql, [
                op.quantity,
                op.order_id,
                op.product_id,
            ])
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(
                `Unable to add product (${op.order_id}): ${
                    (error as Error).message
                }`
            )
        }
    }

    async deleteAddProduct(id: string): Promise<Order_Product | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT id FROM order_product WHERE id=$1`
            const result = await connection.query(sql, [id])
            if (result.rows.length) {
                const sql = `DELETE FROM order_product WHERE id=$1 RETURNING id, quantity, order_id, product_id`
                const result = await connection.query(sql, [id])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `Unable to delete ordered product ${id}, ${
                    (error as Error).message
                })`
            )
        }
    }

    async getOne(id: string): Promise<Order | null> {
        try {
            const connection = await db.connect()
            const sql = `SELECT id FROM orders WHERE id=$1`
            const result = await connection.query(sql, [id])
            if (result.rows.length) {
                const sql = `SELECT * FROM orders WHERE id=$1`
                const result = await connection.query(sql, [id])
                connection.release()
                return result.rows[0]
            } else {
                return null
            }
        } catch (error) {
            throw new Error(
                `unable to get order ${id}, ${(error as Error).message})`
            )
        }
    }
}
export default OrderModel
