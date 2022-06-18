
const { Int32 } = require('bson');
const mongoose = require('mongoose');

var annoncesSchema = new mongoose.Schema({
    category : String,
    title : String,
    description : String,
    images : String,
    iduser:String,
    telephone:String,
    ville:String,
    statut:{type: String, default : "En attente" },
    nbervue:{type: String, default : "0" },
    nbervuetel:{type: String, default : "0" },
    //quartier:String,
    cherche:String,
    reference:String,
    //expireddate:{ type : Date, default : Date.now +7 },
    date : { type : Date, default : Date.now },
  });









  
module.exports= mongoose.model('Annonce', annoncesSchema);
