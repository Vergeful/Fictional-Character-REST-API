const express = require('express')
const app = express()

const { rateLimit } = require('express-rate-limit')
const cors = require('cors')
const helmet = require('helmet')
const xssClean = require('xss-clean')

require('dotenv').config() // allows access to .env (local environment) variables via process.env
require('express-async-errors') // middleware for errors

// Database
const databaseConnection = require('./Database/connect')

// Routers 
const authenticateRouter = require('./Routes/authenticate')
const characterRouter = require('./Routes/characters')

//MIDDLEWARE:
// Built in middleware function in express that parses incoming requests with JSON payloads:
app.use(express.json());

// Middleware for security:
app.set('trust proxy', 1)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 50 // 50 requests can be made per windowMs
}))

app.use(cors())
app.use(helmet())
app.use(xssClean())
app.use(rateLimit())

// Middleware if there is an error in finding page (404 status code):
const cantFindMiddleware = require('./Middleware/cant-find')

// Middleware for other other errors:
const otherErrorsMiddleware = require('./Middleware/other-errors')

// Authenticate user information with database before allowing access to their characters:
const authenticateUserMiddleware = require('./Middleware/authenticate')

// Swagger display for HTTP methods:
const swagger = require('swagger-ui-express')
const YAML = require('yamljs')
const uiDoc = YAML.load('./swagger.yaml')

//Routes
app.use('/documentation', swagger.serve, swagger.setup(uiDoc))

app.get('/',(req,res) =>{
    res.send('<h1>The documentation for this character api can be found <a href="/documentation">here</a></h1>')
} )

app.use('/api/v1/authenticate', authenticateRouter)
app.use('/api/v1/characters', authenticateUserMiddleware, characterRouter)

app.use(cantFindMiddleware)
app.use(otherErrorsMiddleware)

const port = process.env.PORT || 3000

const start = async () =>{
    try{
        await databaseConnection(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))
    }catch(error){
        console.log(error)
    }
}

start()
