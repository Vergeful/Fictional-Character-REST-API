const express = require('express')
const app = express()

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

// Middleware if there is an error in finding page (404 status code):
const cantFindMiddleware = require('./Middleware/cant-find')

// Middleware for other other errors:
const otherErrorsMiddleware = require('./Middleware/other-errors')

// Authenticate user information with database before allowing access to their characters:
const authenticateUserMiddleware = require('./Middleware/authenticate')

//Routes
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
