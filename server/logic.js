/**
 *
 * Hay 4 opciones.
 *
 * 1. Cuando un sensor determinar durante 30s que hay una nave enemiga (>=30). ¡¡ALERTA!! (1° gráfico)
 * 2. Cuando un sensor determinar durante 30s no hay nave enemiga(<30). (2° gráfico)
 *
 * 3. Si durante 2s (inactivo) y 30s (sin información) no hay información sobre el sensor se debe notificar. ¡¡ALERTA!! (3° gráfico)
 * 4. Si durante 2s (inactivo) pero durante los siguientes 30s (<30) hay información fue una falsa alarma. (4° gráfico)
 *
 * 2021-06-01 08:00:01,(Bomber|122),(-|99),(-|0)
 * 2021-06-01 08:00:02,(Bomber|125),(-|61),(-|0)
 * 2021-06-01 08:00:03,(Bomber|121),(-|19),(-|0)
 * 
 * ALERTA tipos:
 * 0: No hay alerta
 * 1: Alerta interna. AMARILLO
 * 2: Alerta visible (MOFF). ROJO
 * ROJO: alert.type === 2 && proximity.type === "danger" (POPUP)
 * AMARILLO: alert.type === 2 && proximity.type === "inactive" (POPUP)
 * BLANCO: alert.type === 1 (NO POPUP)

 * TIPO PROXIMIDAD
 * danger
 * inactive
 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:4200']
    }
});
const axios = require('axios');

const cors = require("cors");
const main = require("./process");

const PORT = process.env.PORT || 3000;
const TOKEN = "b0dfcaf8-e35f-4283-af6c-53d2ca92ae3a";
const URLBattles = "http://ec2-100-26-152-194.compute-1.amazonaws.com:3000/";

// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

let socket;
io.on('connection', (s) => { console.log("Usuario conectado"); socket = s; });

/**
 * Endpoint para la API
 * 
 * Para procesar la info.
 */
app.post("/input", (req, res) => {
    const { data } = req.body;

    const { alerts, graph } = main.processMain(data);
    // const dataBefore = main.getBefore();

    if (alerts.sensors.length > 0) {
        socket.emit("data", alerts);
    }

    if ((graph.dangerCount + graph.inactiveCount) > 0) {
        socket.emit("graph", graph);
    }

    return res.json();
});

/**
 * Endpoint para el Cliente
 * 
 * Para recuperar la info.
 */
app.get("/connect/:index", (req, res) => {
    const { index } = req.params;

    const options = {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Token': TOKEN }
    };

    axios.get(`${URLBattles}battles/${index}`, options)
        .then((response) => {
            res.json();
        }).catch((err) => {
            console.error(err.message);
            res.json();
        });
});

server.listen(PORT, () => {
    console.log(`Escuchando en *:${PORT}`);
});