import express, { Application, Request, Response, urlencoded } from 'express'
import morgan from 'morgan'
import config from './config'
import errormiddleware from './middleware/error.middleware'
import routes from './routes'

const PORT = config.port || 3000

// create an instance server
const app: Application = express()
app.use(express.json())
app.use(urlencoded({ extended: true }))

// HTTP request logger middleware
app.use(morgan('short'))

// /api/routes(users)
app.use('/api', routes)

// add routing for / path
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'Wrong way you might be lost',
    })
})
app.use(errormiddleware)

// start express server
app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`)
})

export default app
