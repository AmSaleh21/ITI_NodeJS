/*
Client Model has -> email, first name, last name, phone number, username
email required 
username unique
*/

//get the Schema module from mongoose
import mongoose from 'mongoose';
const { Schema } = mongoose;

//set the schema
const clientSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  userName: {
    type: String,
    unique: true
  }
})

//set the schema
const client = mongoose.model('client', clientSchema);

//imported in controllers/ClientsController
export default client;
