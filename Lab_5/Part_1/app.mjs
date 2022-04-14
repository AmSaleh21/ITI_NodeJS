import express, { json } from 'express'
const app = express()

//get index /
import indexRoutes from './routes/index_routes.mjs'
//load all the available routes (get/post/put and delete)
import clientRoutes from './routes/clientRoutes.mjs'
//mongoose module to connect to mongodb
import mongoose from 'mongoose'
const { connect } = mongoose;

//connect to mongo through the local host 
//('localhost' crashes the mongoose module) so used IP instead
//and use db company or create and use if not already exists
connect('mongodb://127.0.0.1/company', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//middleware to parse the incoming req.body into JSON obj
app.use(json())

//load the index first
indexRoutes(app)
//then load the other routes
clientRoutes(app)

//middleware to handle error
app.use((err, req, res, next)=>{
  res.status(422).send({error: err.message})
})

//imported in index.mjs
export default app;
