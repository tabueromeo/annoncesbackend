
const DaoCategory = require('../dao/DaoCategory');
var Category = require('../dao/DaoCategory')
//var carimgs = ["tabueromeo marie","https://res.cloudinary.com/lepiston/image/fetch/h_270/http://lepiston.fr/files/QQB3oowxErbkcvgpYopkodBp.jpeg","https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg"];


function showAll(req, res) {
    console.log("category")
    var findCategory = new Promise(function (resolve, reject) {
    
      DaoCategory.find( null, function (err, result) {
          if (err) {
              reject(500);
          } else {
            resolve(result)
          }
      })
  })

  findCategory.then(function (result) {

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
                  "text": "errur"
              })
              break;
          default:
              res.status(500).json({
                  "text": "Erreur interne"
              })
      }
  });

}

 function addCategory (req,res){

       let donnee = req.body;
       var _category= new DaoCategory(donnee);

       _category.save(function (err, donnee) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    console.log("ajout avec sucess")
                    res.status(200).json({
                        "smg": "Succès"
                    })
                }
            })
        
    
}
/*
function showByCriteria(req, res) {
  
    var region = "";

    if (!req.query.region || !req.query.type) {
 
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
         region = req.query.region;
        var logement = {
            region: region,
            type: req.query.type
        }
        var findLogment = new Promise(function (resolve, reject) {

           
            Logment.find({
                region: logement.region
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                  
                  resolve(result)
                }
            })
        })

        findLogment.then(function (result) {
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
}*/

;
//On exporte nos deux fonctions

exports.addCategory = addCategory;
exports.showAll = showAll;
//exports.showByCriteria = showByCriteria;