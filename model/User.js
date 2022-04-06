const User = require('../dao/DaoUser');
const passwordHash = require("password-hash");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();



function signup(req, res) {
    let {ville,telephone,age} = req.body
   // let token = jwt.sign({ville,telephone,age}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
   // res.status(200).json(token)
        
   // return
    if (!req.body.telephone || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            telephone: req.body.telephone,
            password: passwordHash.generate(req.body.password)
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                telephone: user.telephone
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                   let token = jwt.sign({"telephone":user.telephone,"_id":user._id,"ville":user.ville,"age":user.age}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
                    
                    res.status(200).json({
                        "text": "Succès",
                        "token": token,
                        "iduser":user._id,
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "Le numéro existe déjà"
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

function logintoken(req, res) {
    console.log(req.headers)
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    
  
  if (token !== undefined)
  {
    try{
        let payload = jwt.verify(token, process.env.TOKEN_SECRET)
        res.status(200).json(payload)
        return;
    }catch(e){
       
        res.status(401).json("token expiré")
    }
}
}

function login(req, res) {
 
 
if (!req.body.telephone || !req.body.password) {
             return res.status(401).json("requete invalide")
        } else {
            User.findOne({
                telephone: req.body.telephone
            }, function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else if (!user) {
                    res.status(401).json({
                        "text": "L'utilisateur n'existe pas"
                    })
                } else {
                    if (passwordHash.generate(req.body.password)===user.password) {
                        let token = jwt.sign({"telephone":user.telephone,"_id":user._id,"ville":user.ville,"age":user.age}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
                        res.status(200).json({
                            "token":token,
                            "text": "Authentification réussi",
                            "id":user._id,
                        })
                    } else {
                        res.status(401).json({
                            "text": "Mot de passe incorrect"
                        })
                    }
                }
            })
        }
        
     
      
      

  
   
}

function update(req,res){

   
    if (!req.body.telephone) {
        //Le cas où le numéro ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            telephone: req.body.telephone,
            password: req.body.password,//passwordHash.generate(req.body.password),
            passwordgetaccept:req.body.passwordgetaccept, 
            ville:req.body.ville
        }

       

        var updateUser = new Promise(function (resolve, reject) {

            console.log("req.body.id")
            User.findById(
                
                new mongoose.Types.ObjectId(req.body.id)

            , function (err, result) {
                if (err) {
                    reject(500);
                } else {
                  
                  resolve(result)
                }
            })
        })
  
        updateUser.then(function (result) {
            console.log(req.body.apassword)
            console.log(result.password)
         
            if(result.password===req.body.apassword){

    
                        User.findByIdAndUpdate( new mongoose.Types.ObjectId(req.body.id), req.body,function (err, user) {
                            if (err) {
                                res.status(500).json({
                                    "text": "Erreur interne"
                                })

                            } else {
                                console.log("----------------------------------entréeeeee");
                                res.status(200).json({
                                    "text": "Succès"
                                })
                            }
                        })
                    

        

            }else{

                res.status(500).json({
                    "text": "mot de passe ne concorde pas"
                })

            }



        }, function (error) {
  
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "Le numéro existe déjà"
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

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;
exports.logintoken = logintoken;