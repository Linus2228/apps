/** require dependencies */
const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')

const app = express()
const router = express.Router()

/** configure cloudinary */
cloudinary.config({
  cloud_name: 'ddux2vrt6',
  api_key: '995273862481691',
  api_secret: 'MBrNMxXgUn_T6oKmqv0Z0SFJhZo'
})

/** connect to MongoDB datastore */
mongoose.connect('mongodb://localhost/medium');

let port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
// helmet armours our API to prevent attacks
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});