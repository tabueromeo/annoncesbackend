
const mongoose = require('mongoose');

var categorychema = new mongoose.Schema({
  name : String,
  description : String,
  createdAt:{ type : Date, default : Date.now },
  userId : String,
  });









  
module.exports= mongoose.model('Category', categorychema);