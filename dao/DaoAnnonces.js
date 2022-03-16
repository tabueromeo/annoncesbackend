
const { Int32 } = require('bson');
const mongoose = require('mongoose');

var annoncesSchema = new mongoose.Schema({
    category : String,
    wording : String,
    description : String,
    photo : String,
    postNumber : String,
    date : { type : Date, default : Date.now },
  });









  
module.exports= mongoose.model('Annonce', annoncesSchema);