const express = require("express");
const app = express();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const userRoute = require("./routes/user");
const immobileRoute = require("./routes/immobile");


app.use(cors());

app.use(express.json());

app.use("/user", userRoute);
app.use("/immobile", immobileRoute);
  
app.listen(3000, () => {
    console.log("servidor rodando");
})