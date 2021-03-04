//Defining_Model
const mongoose = require('mongoose');

let t =  {  Name: {
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
},}


const ElecCustomerSchema = new mongoose.Schema(t,{strict: false});

const ElecCustomer = mongoose.model('Electronics_Shop', ElecCustomerSchema);

module.exports = ElecCustomer;
