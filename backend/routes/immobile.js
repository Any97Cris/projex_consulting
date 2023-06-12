const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send({data:"página immobile"});
});

router.post("/create", (req,res) => {
    res.send({data:"página create"});
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