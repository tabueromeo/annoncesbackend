const DaoPrivilege = require('../dao/DaoPrivilege');
var carimgs = ["tabueromeo marie","https://res.cloudinary.com/lepiston/image/fetch/h_270/http://lepiston.fr/files/QQB3oowxErbkcvgpYopkodBp.jpeg","https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg"];


function showAll(req, res) {
    console.log("privilèges")
    var findPrivilege = new Promise(function (resolve, reject) {
    
        DaoPrivilege.find(null, function (err, result) {
          if (err) {
              reject(500);
          } else {
            resolve(result)
          }
      })
  })

  findPrivilege.then(function (result) {

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
function addPrivilege (req,res){

       let donnee = req;
       console.log(req.body)
       var _privilege= new DaoPrivilege(donnee);

       _privilege.save(function (err, donnee) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    console.log("ajout des privilèges")
                    res.status(200).json({
                        "text": "Succès--- privilege"
                    })
                }
            })
        
    
}
;
exports.addPrivilege = addPrivilege;
exports.showAll = showAll;

//exports.update=update;
//exports.deleteannonce = deleteannonce;