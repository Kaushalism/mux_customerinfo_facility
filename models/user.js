//Defining_Model
const mongoose = require('mongoose');

const OSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model( 'Ownership',OSchema);

module.exports = User;
