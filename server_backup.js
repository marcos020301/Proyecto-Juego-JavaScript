const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://marcos2001mgs_db_user:prueba123@ac-1gbrc4g-shard-00-00.dsealjv.mongodb.net:27017,ac-1gbrc4g-shard-00-01.dsealjv.mongodb.net:27017,ac-1gbrc4g-shard-00-02.dsealjv.mongodb.net:27017/?ssl=true&replicaSet=atlas-10utut-shard-0&authSource=admin&appName=Cluster0")
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

const puntuacionSchema = new mongoose.Schema({
    nombre: String,
    puntos: Number
});

const Puntuacion = mongoose.model("Puntuacion", puntuacionSchema);

app.post("/guardar-puntuacion", async (req, res) => {
    try {
        const nuevaPuntuacion = new Puntuacion({
            nombre: req.body.nombre,
            puntos: req.body.puntos
        });

        await nuevaPuntuacion.save();

        res.json({ mensaje: "Puntuación guardada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/prueba", async (req, res) => {

    const prueba = new Puntuacion({
        nombre: "Marcos",
        puntos: 999
    });

    await prueba.save();

    res.send("Guardado");
});