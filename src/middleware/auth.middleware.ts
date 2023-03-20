import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interface/error.interface'

const errorHandller = (next: NextFunction) => {
    const error: Error = new Error('You have to login')
    error.status = 401
    next(error)
}

const validateTokenMiddleWare = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.get('Authorization')
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase()
            const token = authHeader.split(' ')[1]
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(
                    token,
                    config.token as unknown as string
                )
                if (decode) {
                    next()
                } else {
                    errorHandller(next)
                }
            } else {
                errorHandller(next)
            }
        } else {
            errorHandller(next)
        }
    } catch (error) {
        errorHandller(next)
    }
}

export default validateTokenMiddleWare
