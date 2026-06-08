const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});

const puntuacionSchema = new mongoose.Schema({
    nombre: String,
    puntos: Number
});

const Puntuacion = mongoose.model("Puntuacion", puntuacionSchema);

app.post("/guardar-puntuacion", async (req, res) => {

    try {

        const { nombre, puntos } = req.body;

        const jugadorExistente =
        await Puntuacion.findOne({ nombre });

        if (!jugadorExistente) {

            await Puntuacion.create({
                nombre,
                puntos
            });

        } else if (puntos > jugadorExistente.puntos) {

            jugadorExistente.puntos = puntos;
            await jugadorExistente.save();
        }

        res.json({
            mensaje: "Puntuación procesada"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
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

app.get("/ranking", async (req, res) => {

    try {

        const ranking = await Puntuacion
            .find()
            .sort({ puntos: -1 })
            .limit(10);

        res.json(ranking);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

