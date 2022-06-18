const DaoAnnonces = require('../dao/DaoAnnonces');
const User = require('../dao/DaoUser');
const config = require('./../config/config');
const mongoose = require("mongoose");

function addannonce(req, res) {

   console.log("entrée annonce model")
   var datecurent = new Date();
  let donnee = req.body;
  donnee["reference"] = "LVS"+(datecurent.getFullYear()+ datecurent.getMonth()+datecurent.getDay()+datecurent.getHours()+datecurent.getMinutes()+datecurent.getSeconds())+donnee.iduser.substring(donnee.iduser.length-4,donnee.iduser.length)
 
console.log(donnee)

  // recherche de l'utilisateur qui enregistre une annonce
  User.findById({
  _id:  new mongoose.Types.ObjectId(req.body.iduser)
}, function (err, user) {
    if (err) {
       
        console.log("Erreur interne")
    
    } else if (!user) {
        
        console.log("L'utilisateur n'existe pas")
     
    } else {
       
        donnee={
            ...donnee,
            telephone:user.telephone,
            ville:user.ville,
        }

                var _annonce = new DaoAnnonces(donnee);
        _annonce.save(function (err, donnee) {
            if (err) {
                console.log(err)
                res.status(500).json({
                    "msg": "Erreur sauvegarde bd"
                })

            } else {
                console.log("entréeee dans ajout des  ok")

                res.status(200).json({
                    "msg": "Succès"
                })
            }
        })
  

    }
})


  
}



function showAllAnnonce(req,res){

  console.log("entréeeee");
      var findAnnonce = new Promise(function (resolve, reject) {
      
        DaoAnnonces.find( null, function (err, result) {
            if (err) {
                reject(500);
            } else {
              resolve(result)
            }
        })
    })

    findAnnonce.then(function (result) {

      //  console.log(result);
        res.send(result)
    }, function (error) {

        switch (error) {
            case 500:
                res.status(500).json({
                    "text": "Erreur interne"
                })
                break;
            case 204:
                res.status(204).json({
                    "text": "L'adresse email existe déjà"
                })
                break;
            default:
                res.status(500).json({
                    "text": "Erreur interne"
                })
        }
    })

}
function showByCriteriaAnnonce(req, res) {
  

    

  if (!req.query.category && !req.query.ville) {

      res.status(400).json({
          "text": "Requête invalide"
      })
  } else if(req.query.category) {
    console.log(req.query)
      var findannonce = new Promise(function (resolve, reject) {

         
        DaoAnnonces.find({
            category:  req.query.category
          }, function (err, result) {
              if (err) {
                  reject(500);
              } else {
                
                resolve(result)
              }
          })
      })

      findannonce.then(function (result) {
            
          res.send(result)
      }, function (error) {

          switch (error) {
              case 500:
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
                  break;
              case 204:
                  res.status(204).json({
                      "text": "Aucune annonce ne correpond"
                  })
                  break;
              default:
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
          }
      })
  }else if(req.query.ville) {
    console.log(req.query)
    var findannonce = new Promise(function (resolve, reject) {

       
      DaoAnnonces.find({
          ville:  req.query.ville
        }, function (err, result) {
            if (err) {
                reject(500);
            } else {
              
              resolve(result)
            }
        })
    })

    findannonce.then(function (result) {
          
        res.send(result)
    }, function (error) {

        switch (error) {
            case 500:
                res.status(500).json({
                    "text": "Erreur interne"
                })
                break;
            case 204:
                res.status(204).json({
                    "text": "Aucune annonce ne correpond"
                })
                break;
            default:
                res.status(500).json({
                    "text": "Erreur interne"
                })
        }
    })
}
}

function showByUserIdAnnonce(req, res) {
  
    if (!req.query.iduser) {
  
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
     
        var findannonce = new Promise(function (resolve, reject) {
  
           
          DaoAnnonces.find({
              iduser:  req.query.iduser
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                  
                  resolve(result)
                }
            })
        })
  
        findannonce.then(function (result) {
            
            res.send(result)
        }, function (error) {
  
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "Aucune annonce ne correpond"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
  }
  



function deleteannonce(req,res){


  //  console.log(req.body)

   // console.log(req.body.images.split(','))
  


    DaoAnnonces.findByIdAndRemove( new mongoose.Types.ObjectId(req.body.id),function (err, user) {

        console.log("----------------------------------entréeeeee");
        console.log(req.body.id);
        if (err) {
            res.status(500).json({
                "text": "Erreur interne"
            })

        } else {
            console.log("----------------------------------entréeeeee");
            res.status(200).json({
                "text": "modifier avec Succès"
            })
        }
    })


}


function updateAnnonce(req,res){


  //  console.log(req.body)
    let donnee = req.body;
  //  donnee["images"] = req.body.images.split(',');
   // console.log(req.body.images.split(','))
  


    DaoAnnonces.findByIdAndUpdate( new mongoose.Types.ObjectId(req.body._id),donnee,function (err, user) {

      
        if (err) {
            console.log(err)
            res.status(500).json({
                "text": "Erreur interne"
            })

        } else {
            console.log("----------------------------------entréeeeee");
            res.status(200).json({
                "text": "modifier avec Succès"
            })
        }
    })


}


function showOneAnnonce(req, res) {
  

 
    if (!req.query.id) {
  
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var findannonce = new Promise(function (resolve, reject) {

            DaoAnnonces.findById(
                
                new mongoose.Types.ObjectId(req.query.id)

            , function (err, result) {
                if (err) {
                    reject(500);
                } else {
                  
                  resolve(result)
                }
            })
        })
  
        findannonce.then(function (result) {
            console.log(result,'romeoooooooooooooooo');
            res.send(result)
        }, function (error) {
  
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
    
  }

  String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
  };


//On exporte nos deux fonctions

exports.addannonce = addannonce;
exports.showAllAnnonce = showAllAnnonce;
exports.showOneAnnonce = showOneAnnonce;
exports.updateAnnonce=updateAnnonce;
exports.showByCriteriaAnnonce = showByCriteriaAnnonce;
exports.showByUserIdAnnonce = showByUserIdAnnonce;
exports.deleteannonce = deleteannonce;
