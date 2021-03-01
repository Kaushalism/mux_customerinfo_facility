//Defining_Model
const mongoose = require('mongoose');

const ElecFormFields = new mongoose.Schema({
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

const Electronics_fields = mongoose.model('addedf_electronics', ElecFormFields);

module.exports = Electronics_fields;
