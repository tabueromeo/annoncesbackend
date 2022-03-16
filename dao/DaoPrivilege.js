
const mongoose = require('mongoose');
// les opérations représentent l'avancement du service clé en main, des services à la demande et des logments passés à l'état suivant de la visite
var privilegeSchema = new mongoose.Schema({
  libelleprivilege : String,
  priviletype : String,
  typeuser : String,
  createdAt : { type : Date, default : Date.now }
  });


module.exports= mongoose.model('Privilege', privilegeSchema);