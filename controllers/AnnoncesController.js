const annonce = require('../model/Annonces');

module.exports = function (app) {
    console.log("entre_____________________________controleurAnnonce")
    app.post('/addannonce',annonce.addannonce);
    app.get('/readannonce',annonce.showAllAnnonce);
    app.get('/one',annonce.showOneAnnonce)
    app.get('/showbyiduser',annonce.showByCriteriaAnnonce)
    app.post('/update',annonce.updateAnnonce)
    app.post('/deleteannonce',annonce.deleteannonce)
}
