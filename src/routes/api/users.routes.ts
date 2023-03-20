import Router from 'express'
import * as controllers from '../../controllers/users.controllers'
import authMiddleware from '../../middleware/auth.middleware'

const routes = Router()

routes
    .route('/')
    .get(authMiddleware, controllers.getAllUsers)
    .post(authMiddleware, controllers.create)

routes
    .route('/:id')
    .get(authMiddleware, controllers.getOne)
    .patch(authMiddleware, controllers.updateUser)
    .delete(authMiddleware, controllers.deleteUser)

routes.route('/auth').post(controllers.auth)
export default routes
