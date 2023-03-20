import Router from 'express'
import * as controllers from '../../controllers/products.controllers'

const routes = Router()

routes.route('/:category').get(controllers.getProByCate)
export default routes
