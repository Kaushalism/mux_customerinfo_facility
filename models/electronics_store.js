//Defining_Model
const mongoose = require('mongoose');

const ElecCustomerSchema = new mongoose.Schema({
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
  fathersName: {
    type: String,
    required: false,
  },
},{strict: false});

const ElecCustomer = mongoose.model('Electronics_Shop', ElecCustomerSchema);

module.exports = ElecCustomer;
