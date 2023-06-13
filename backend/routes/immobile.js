const express = require("express");
const router = express.Router();
const {body, param, validationResult} = require("express-validator");

var DB = {
    immobile: [
      {
        id: 1,
        deed_property: "S",
        certificate_full_content: "S",
        wedding_certificate: "S",
        rg: 36606514,
        cpf: 66428972000
      },
      {
        id: 2,
        deed_property: "S",
        certificate_full_content: "S",
        wedding_certificate: "S",
        rg: 40263804,
        cpf: 68261390063
      },{
        id: 3,
        deed_property: "S",
        certificate_full_content: "S",
        wedding_certificate: "S",
        rg: 23858308,
        cpf: 43410226010
      },
      {
        id: 4,
        deed_property: "S",
        certificate_full_content: "S",
        wedding_certificate: "S",
        rg: 23858302,
        cpf: 43410226010
      },
    ]
   }


router.get("/", (req, res) => {
    res.json(DB.immobile).status(200);
});

router.get("/:id",[
    param("id").isNumeric().custom(async (value) => {
        const idExists = await DB.immobile.find(db => db.id == value);
        if (!idExists) {
          throw new Error('Not Found!');
        }
      })
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        
        var id = parseInt(req.params.id);
        var banco_dados = DB.immobile.find(db => db.id == id);
        
        return res.json(banco_dados).status(200);
        
    }
});

router.post("/create",[
    body("id").isNumeric().custom(async (value) => {
        const idExists = await DB.immobile.find(db => db.id == value);
        if (idExists) {
          throw new Error('ID already exist!');
        }
      }),
    body("deed_property").isString().isLength({min: 1}),
    body("certificate_full_content").isString().isLength({min: 1}),
    body("wedding_certificate").isString().isLength({min: 1}),
    body("rg").isNumeric().isLength({min:8}).custom(async (value) => {
        const rgExists = await DB.immobile.find(db => db.rg == value);
        if (rgExists) {
          throw new Error('RG already exist!');
        }
      }),
    body("cpf").isNumeric().isLength({min: 11}).custom(async (value) => {
        const cpfExists = await DB.immobile.find(db => db.cpf == value);
        if (cpfExists) {
          throw new Error('CPF already exist!');
        }
      })
],(req,res) => {  
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }else{
        var {id,deed_property,certificate_full_content,wedding_certificate,rg,cpf} = req.body
        DB.immobile.push({
            id,
            deed_property,
            certificate_full_content,
            wedding_certificate,
            rg,
            cpf
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
    
        var banco_dados = DB.immobile.find(db => db.id == id);
    
            if(banco_dados != undefined){
                var {id,deed_property,certificate_full_content,wedding_certificate,rg,cpf} = req.body

                if(deed_property != undefined){
                    banco_dados.deed_property = deed_property;
                }

                if(certificate_full_content != undefined){
                    banco_dados.certificate_full_content = certificate_full_content;
                }

                if(wedding_certificate != undefined){
                    banco_dados.wedding_certificate = wedding_certificate;
                }

                if(rg != undefined){
                    banco_dados.rg = rg;
                }

                if(cpf != undefined){
                    banco_dados.cpf = cpf;
                }

                res.json({message: "Successfully Edited Data"}).status(200);

            }else{
                res.json({message: "Not Found"}).status(404)
            }
        
        return res.json({message: "Successfully Registered Data!"}).status(200);        
        
    }
    
});

router.delete("/delete/:id",[
    param("id").isNumeric().custom(async (value) => {
        const idExists = await DB.immobile.find(db => db.id == value);
        if (!idExists) {
          throw new Error('Not Found!');
        }
      })
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
        var id = req.params
        DB.immobile.splice(id,1);
        return res.json({message: "Successfully Deleted Data!"}).sendStatus(200);
        
    }
})

module.exports = router;