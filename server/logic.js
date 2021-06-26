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
const app = express();

const cors = require("cors");
const main = require("./process");

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

/**
 * Endpoint para la API
 * 
 * Para procesar la info.
 */
app.post("/input", (req, res) => {
    const { data } = req.body;

    const info = main.processMain(data);
    return res.json({ info });
});

/**
 * Endpoint para el Cliente
 * 
 * Para recuperar la info.
 */
app.get("/info", (req, res) => {
    const dataBefore = main.getBefore();
    return res.status(200).json({ data: dataBefore });
});

app.listen(PORT, () => {
    console.log(`Escuchando en *:${PORT}`);
});