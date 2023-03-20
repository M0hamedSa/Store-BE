import { Request, Response, NextFunction } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()

//Create controller
export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product = await productModel.create(req.body)

        res.json({
            status: 'done',
            data: product,
            message: 'product created sucessfully',
        })
    } catch (error) {
        next(error)
    }
}
//Get by category
export const getProByCate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { category } = req.params
        const product = await productModel.getProByCate(
            category as unknown as string
        )

        if (!product) {
            return res.json({
                status: 'GET error',
                message: `No products in ${category} category`,
            })
        } else {
            res.json({
                status: 'done',
                data: product,
                message: 'products retrieved sucessfully',
            })
        }
    } catch (err) {
        next(err)
    }
}
//Get all controller
export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await productModel.getAllProducts()
        res.json({
            status: 'done',
            data: products,
            message: 'products retrieved sucessfully',
        })
    } catch (err) {
        next(err)
    }
}
//Get one controller
export const getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const product = await productModel.getOne(id as unknown as string)

        if (!product) {
            return res.json({
                status: 'GET error',
                message: `No product with ID:${id}`,
            })
        } else {
            res.json({
                status: 'done',
                data: product,
                message: 'product retrieved sucessfully',
            })
        }
    } catch (err) {
        next(err)
    }
}
//Update product controller
export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const { name, price, category } = req.body
        const product = await productModel.updateProduct(
            id,
            name,
            price,
            category
        )

        if (!product) {
            return res.json({
                status: 'UPDATE error',
                message: `Product with ID:${id} does't exist`,
            })
        } else {
            res.json({
                status: 'done',
                data: product,
                message: 'product updated sucessfully',
            })
        }
    } catch (err) {
        next(err)
    }
}
//delete product controller
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const product = await productModel.deleteProduct(
            id as unknown as string
        )

        if (!product) {
            return res.json({
                status: 'DELETE error',
                message: `Product with ID:${id} does't exist`,
            })
        } else {
            res.json({
                status: 'done',
                data: product,
                message: 'product deleted sucessfully',
            })
        }
    } catch (err) {
        next(err)
    }
}
