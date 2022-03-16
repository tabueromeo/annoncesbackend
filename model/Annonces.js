const DaoAnnonces = require('../dao/DaoAnnonces');
const config = require('./../config/config');
const mongoose = require("mongoose");

function addannonce(req, res) {

   
   var datecurent = new Date();

  let donnee = req.body;
  var _annonce = new DaoAnnonces(donnee);
  _annonce.save(function (err, donnee) {
      if (err) {

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

  //console.log(result);
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
  
  if (!req.query.ville || !req.query.type) {

      res.status(400).json({
          "text": "Requête invalide"
      })
  } else {
      var logement = {
          ville:  req.query.ville,
          type: req.query.type
      }
      var findannonce = new Promise(function (resolve, reject) {

         
        DaoAnnonces.find({
              type: "appartement"
          }, function (err, result) {
              if (err) {
                  reject(500);
              } else {
                
                resolve(result)
              }
          })
      })

      findannonce.then(function (result) {
            console.log("show-by-criterie",result,":----------------------show by criteria end")
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
    donnee["images"] = req.body.images.split(',');
   // console.log(req.body.images.split(','))
  


    DaoAnnonces.findByIdAndUpdate( new mongoose.Types.ObjectId(req.body.id),donnee,function (err, user) {

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
exports.deleteannonce = deleteannonce;
