import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model'
import config from '../config'
import User from '../types/user.type'

const userModel = new UserModel()

//Create controller
export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const u: User = req.body
        const user = await userModel.create(u)

        if (!user) {
            return res.json({
                status: 'CREATE error',
                message: 'Username is used before',
            })
        } else {
            res.json({
                status: 'done',
                data: user,
                message: 'user created sucessfully',
            })
        }
    } catch (error) {
        next(error)
    }
}
//Get all controller
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userModel.getAllUsers()
        res.json({
            status: 'done',
            data: users,
            message: 'users retrieved sucessfully',
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
        const user = await userModel.getOne(id as unknown as string)

        if (!user) {
            return res.json({
                status: 'GET error',
                message: `User with ID:${id} does't exist`,
            })
        } else {
            res.json({
                status: 'done',
                data: user,
                message: 'user retrieved sucessfully',
            })
        }
    } catch (err) {
        next(err)
    }
}
//Update user controller
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const { username, first_name, last_name, password } = req.body
        const user = await userModel.updateUser(
            id,
            username,
            first_name,
            last_name,
            password
        )

        if (!user) {
            return res.json({
                status: 'UPDATE error',
                message: `User with ID:${id} does't exist`,
            })
        } else {
            res.json({
                status: 'done',
                data: user,
                message: 'user updated sucessfully',
            })
        }
    } catch (err) {
        next(err)
    }
}
//delete user controller
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params
        const user = await userModel.deleteUser(id as unknown as string)

        if (!user) {
            return res.json({
                status: 'DELETE error',
                message: `User with ID:${id} does't exist`,
            })
        } else {
            res.json({
                status: 'done',
                data: user,
                message: 'user deleted sucessfully',
            })
        }
    } catch (err) {
        next(err)
    }
}

//auth
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const user = await userModel.auth(username, password)
        const token = jwt.sign({ user }, config.token as unknown as string)
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'username or password is incorrect pls try again',
            })
        }

        return res.json({
            status: 'done',
            data: { user, token },
            message: 'user authenticated sucessfully',
        })
    } catch (err) {
        next(err)
    }
}
