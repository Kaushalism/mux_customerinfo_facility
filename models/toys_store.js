//Defining_Model
const mongoose = require('mongoose');

const ToysCustomerSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Mobileno: {
    type: Number,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  bday: {
    type: Date,
    required: false,
  },
},{strict: false});

const ToyCustomer = mongoose.model('Toys_Shop', ToysCustomerSchema);

module.exports = ToyCustomer;
