require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')



//express app
const app = express()

app.use(cors());

//middleware
app.use(express.json()) //so that we can access to the body of a req aka data  

// Use the routes from the index.js file
app.use('/api', require('./routes/index'));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 






//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        //listen for requests
        app.listen( process.env.PORT, () => {
            console.log('connected to the database and listening on port',process.env.PORT )
        })

    })
    .catch((error) => { 
       console.log(error) 
    })


