const privilege = require('../model/Privilege');

module.exports = function (app) {
    console.log("entre_____________________________controleurPrivilege")
    app.post('/addprivilege',privilege.addPrivilege);
    app.get('/read',privilege.showAll);
  //  app.get('/one',privilege.showOne)
  //  app.get('/show-by-criteria',logement.showByCriteria)
   // app.post('/update',privilege.update)
   // app.post('/deletelogement',privilege.deletelogement)
}