
const CategoryModel = require('../model/Category')


var carimgs = ["tamtampion","https://res.cloudinary.com/lepiston/image/fetch/h_270/http://lepiston.fr/files/QQB3oowxErbkcvgpYopkodBp.jpeg","https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/city.jpg"];

module.exports = function (app) {
  console.log("entre_____________________________controleurcategory")
  app.post('/addcategory',CategoryModel.addCategory);
    app.get('/read', CategoryModel.showAll);


}