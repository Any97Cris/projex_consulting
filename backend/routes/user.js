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
    res.statusCode = 200;
    res.json(DB.users);
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


router.put("/update", (req,res) => {
    res.send({data: "págia editar"})
});

router.delete("/delete/", (req,res) => {
    res.send({data: "página deletar"});
})



module.exports = router;