import { Request, Response, NextFunction } from 'express'
import Error from '../interface/error.interface'

const errormiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error.status || 500
    const message = error.message || 'Sorry something went wrong ):'
    res.status(status).json({ status, message })
}

export default errormiddleware
