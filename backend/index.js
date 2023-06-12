const express = require("express");
const app = express();
const userRoute = require("./routes/user");
const immobileRoute = require("./routes/immobile");


app.use("/user", userRoute);
app.use("/immobile", immobileRoute);
  
app.listen(3000, () => {
    console.log("servidor rodando");
})