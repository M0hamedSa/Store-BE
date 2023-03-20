import { Router } from 'express'
import * as controllers from '../../controllers/orders.controllers'
import authMiddleware from '../../middleware/auth.middleware'

const routes = Router()

routes.route('/').post(authMiddleware, controllers.createOrder)
routes.route('/:id').get(authMiddleware, controllers.getOne)
routes.route('/:id').delete(authMiddleware, controllers.deleteAddProduct)
routes.route('/:id/products').post(authMiddleware, controllers.addProduct)

export default routes
