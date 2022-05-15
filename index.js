const express = require('express')
const path = require('path')
const config = require('./config/config');
const app = express();
var bodyParser = require('body-parser');
var router = express.Router();
const mongoose = require("mongoose");
const https = require("https");
const fs = require('fs');

const PORT = process.env.PORT || 4000

/*

mongoose.connect("mongodb+srv://lovons:lovons@lovons.jwtjz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to mongoDB')
}).catch(e => {
  console.log('Error while DB connecting');
  console.log(e);
});
*/


mongoose.connect(config.CURRENT_BD_PATH).then(() => {
  console.log('Connected to mongoDB')
}).catch(e => {
  console.log('Error while DB connecting');
  console.log(e);
});

  //Définition des CORS
app.use(function (req, res, next) {
  res.setHeader('Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.send(" debut du boulot."))

  //On définit notre objet express nommé app
app.use(bodyParser.urlencoded({parameterLimit: 10000, limit: '50mb', extended: true }));
app.use(bodyParser.json({parameterLimit: 10000, limit: '50mb'}));






// appel des routes 

app.use('/category', router);
require('./controllers/CategoryControllers')(router);

app.use('/annonces', router);
require('./controllers/AnnoncesController')(router);

app.use('/privilege', router);
require('./controllers/PrivilegeController')(router);

app.use('/user', router);
require('./controllers/userController')(router);





https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("/etc/letsencrypt/keys/0001_key-certbot.pem"),
      csr: fs.readFileSync("/etc/letsencrypt/csr/0001_csr-certbot.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log("serever is runing at port 4000");
  });

//app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
