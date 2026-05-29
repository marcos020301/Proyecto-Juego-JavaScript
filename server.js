const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://usuario_db_mgs2001:Prueba12345@cluster0.dsealjv.mongodb.net/juego?retryWrites=true&w=majority")
.then(() => {
    console.log("Conectado a MongoDB");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});