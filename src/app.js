import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(express.urlencoded({limit:'20kb', extended : true}))
app.use(express.json({limit:'20kb'}))
app.use(cors({
    origin : '*',
    credentials : true
}))
app.use(cookieParser())


// routes

import userRoutes from './routes/user.routes.js'
import categoryRoutes from './routes/category.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/cart', cartRoutes)


export {app}