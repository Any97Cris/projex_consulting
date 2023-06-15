const express = require("express");
const connection = require("../connection_db");
require("dotenv").config();
const router = express.Router();
const {body, validationResult, param} = require("express-validator");  
const { query } = require("../connection_db");


router.get("/", (req, res) => {
    let query = 'select nome, email, password from users';

    connection.query(query, (err, results) => {
        if(!err){
            return res.status(200).json({data: results});
        }else{
            return res.status(500).json({ err });
        }
    })
});

router.get("/:id",[
    param("id").isNumeric()
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        var id = parseInt(req.params.id);        
        let query = `select id, nome, email, password from users where id = ${id}`
        console.log(query);
        connection.query(query,[id],(err, results) => {            
            if(!err){                
                return res.status(200).json({data: results[0]});    
            }else{
                return res.status(500).json({ err });
            }
        });        
    }
});

router.post("/",[
    body("nome").isString(),
    body("email").isEmail(),
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