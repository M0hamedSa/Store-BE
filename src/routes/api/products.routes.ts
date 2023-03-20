import Router from 'express'
import * as controllers from '../../controllers/products.controllers'
import authMiddleware from '../../middleware/auth.middleware'

const routes = Router()

routes
    .route('/')
    .post(authMiddleware, controllers.create)
    .get(controllers.getAllProducts)

routes
    .route('/:id')
    .get(controllers.getOne)
    .patch(authMiddleware, controllers.updateProduct)
    .delete(authMiddleware, controllers.deleteProduct)

export default routes
