const mongoose = require('mongoose');
 
const coinsSchema = new mongoose.Schema({
  name: String,
  description : String,
  denomination: Number,   
  year : String, 
  country: String,
  material: String
});
 
module.exports = mongoose.model('Coin', coinsSchema);