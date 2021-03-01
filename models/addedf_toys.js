//Defining_Model
const mongoose = require('mongoose');

const ToysFormFields = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
      type : String,
      required : true,
  },
  deleted: {
    type : String,
    required :true,
  },
  imp: {
    type : String,
    required :true,
  }
  },{strict: false});

const Toys_fields = mongoose.model('addedf_toys', ToysFormFields);

module.exports = Toys_fields;
