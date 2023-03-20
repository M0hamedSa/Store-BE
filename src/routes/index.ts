import { Router } from 'express'
import usersRoutes from './api/users.routes'
import productsRoutes from './api/products.routes'
import proRoutes from './api/category.routes'
import orderRoutes from './api/order.routes'

const routes = Router()

// /api/users/Routes(/)

routes.get('/', (req, res) => {
    res.send('main api')
}),
    routes.use('/users', usersRoutes)
routes.use('/products', productsRoutes)
routes.use('/products/category', proRoutes)
routes.use('/orders', orderRoutes)

export default routes
