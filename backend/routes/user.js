const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send({data:"página user"});
});

router.post("/create", (req,res) => {
    let {nome,email,password} = req.body;
    return res.json(password);
});

router.get("/id/",(req,res) => {
    res.send({data: "encontrar por ID"});
});

router.put("/update", (req,res) => {
    res.send({data: "págia editar"})
});

router.delete("/delete/", (req,res) => {
    res.send({data: "página deletar"});
})



module.exports = router;