const express = require("express");
const router = express.Router();
const {body, validationResult, param} = require("express-validator");

var DB = {
    users: [
      {
        id: 1,
        nome: "Crisciany Silva",
        email: "criscianysilva@gmail.com",
        password: "123456"
      },
      {
        id: 2,
        nome: "Samuelson Brito",
        email: "samuelsonbrito@gmail.com",
        password: "Sam123"
      },{
        id: 3,
        nome: "Cristiane Silva",
        email: "cristianesilva@gmail.com",
        password: "cris123"
      },
    ]
   }
  


router.get("/", (req, res) => {
    res.json(DB.users).status(200);
});

router.get("/:id",[
    param("id").isNumeric()
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        //parserInt = converte em número
        var id = parseInt(req.params.id);

        var banco_dados = DB.users.find(db => db.id == id);

        if(banco_dados != undefined){
            res.json(banco_dados).status(200);
        }else{
            res.json({message: "Invalid value"}).status(404)
        }
    }
});

router.post("/create",[
    body("id").isNumeric().custom(value => {
        if(value == DB.users["id"]){
            return Promise.reject('ID already exists!');
        }
    }),
    body("nome").isString(),
    body("email").custom(value => {
        if(value == DB.users["email"]){
            return Promise.reject('E-mail already exists!');
        }
    }),
    body("password").isLength({min: 6})
],(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }else{
        var {id, nome, email, password} = req.body;
        DB.users.push({
            id,
            nome,
            email,
            password
        });
        return res.json({message: "Successfully Registered Data!"}).status(200);
    }
});

router.put("/update/:id", [
    param("id").isNumeric()
],(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }else{
        
        //parserInt = converte em número
        var id = parseInt(req.params.id);
    
        var banco_dados = DB.users.find(db => db.id == id);
    
            if(banco_dados != undefined){
                var {nome, email, password} = req.body;

                if(nome != undefined){
                    banco_dados.nome = nome;
                }

                if(email != undefined){
                    banco_dados.email = email;
                }

                if(password != undefined){
                    banco_dados.password = password;
                }

                res.json({message: "Successfully Edited Data"}).status(200);

            }else{
                res.json({message: "Not Found"}).status(404)
            }
        
        return res.json({message: "Successfully Registered Data!"}).status(200);        
        
    }
    
});

router.delete("/delete/:id",[
    param("id").isNumeric()
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        //parserInt = converte em número
        var id = parseInt(req.params.id);

        var banco_dados = DB.users.findIndex(db => db.id == id);

        if(banco_dados == -1){
            res.json({message: "Not Found"}).sendStatus(404);
        }else{
            DB.users.splice(banco_dados,1);
            res.json({message: "Successfully Deleted Data!"}).sendStatus(200);
        }
    }
})



module.exports = router;