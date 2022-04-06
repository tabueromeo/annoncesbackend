
const { Int32 } = require('bson');
const mongoose = require('mongoose');

var annoncesSchema = new mongoose.Schema({
    category : String,
    title : String,
    description : String,
    images : String,
    iduser:String,
    date : { type : Date, default : Date.now },
  });









  
module.exports= mongoose.model('Annonce', annoncesSchema);
