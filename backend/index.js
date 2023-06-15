const express = require("express");
const app = express();
const connection = require("./connection_db");
const cors = require('cors');
const userRoute = require("./routes/user");
const immobileRoute = require("./routes/immobile");

app.use(cors());

app.use(express.json());

app.use("/user", userRoute);
app.use("/immobile", immobileRoute);
  
app.listen(3003, () => {
    console.log("servidor rodando");
})