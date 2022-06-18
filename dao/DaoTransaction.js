
const mongoose = require('mongoose');
// les opérations représentent l'avancement du service clé en main, des services à la demande et des logments passés à l'état suivant de la visite
var transactionSchema = new mongoose.Schema({
  value : String,
  statut : String,
  userId : String,
  date : { type : Date, default : Date.now }
  });


module.exports= mongoose.model('Transaction', transactionSchema);