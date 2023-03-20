import { Request, Response, NextFunction } from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await orderModel.createOrder(req.body)

        res.json({
            status: 'done',
            data: product,
            message: 'order created sucessfully',
        })
    } catch (error) {
        next(error)
    }
}

export const addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await orderModel.addProduct(req.body)

        res.json({
            status: 'done',
            data: product,
            message: 'product added to order sucessfully',
        })
    } catch (error) {
        next(error)
    }
}

export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const order = await orderModel.getOne(id as unknown as string)
        if (!order) {
            return res.json({
                status: 'GET error',
                message: `No order with ID:${id}`,
            })
        }

        res.json({
            status: 'done',
            data: order,
            message: 'order retrieved sucessfully',
        })
    } catch (error) {
        next(error)
    }
}

export const deleteAddProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const user = await orderModel.deleteAddProduct(id as unknown as string)

        if (!user) {
            return res.json({
                status: 'DELETE error',
                message: `Ordered Product with ID:${id} does't exist`,
            })
        } else {
            res.json({
                status: 'done',
                data: user,
                message: 'ordered product deleted sucessfully',
            })
        }
    } catch (err) {
        next(err)
    }
}
