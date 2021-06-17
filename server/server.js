const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const serveStatic = require('serve-static')
const path = require('path')
const connectDB = require('./config/db')
const productsRoutes = require("./routes/productsRoutes")
const cartRoutes = require("./routes/cartRoutes")

require('dotenv').config()

connectDB()
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});