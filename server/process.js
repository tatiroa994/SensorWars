// let count = 0;
// const interval = setInterval(() => {
//     const data = createDataRandom(count);

//     // processMain(data);
//     console.log(data);

//     if (++count > 60) clearInterval(interval);
// }, 1000);

// const createDataRandom = (count) => {
//     return `2021-06-01 08:00:0${count},(Bomber|${Math.floor(Math.random() * 200)}),(-|${Math.floor(Math.random() * 200)}),(-|${Math.floor(Math.random() * 200)}),(Bomber|${Math.floor(Math.random() * 200)}),(-|${Math.floor(Math.random() * 200)}),(-|${Math.floor(Math.random() * 200)}),(Gunship|${Math.floor(Math.random() * 200)}),(-|${Math.floor(Math.random() * 200)}),(-|${Math.floor(Math.random() * 200)}),(-|${Math.floor(Math.random() * 200)})`
//     // return `2021-06-01 08:00:0${count},(Bomber|${0}),(-|${Math.floor(Math.random() * 200)}),(-|${133})`
// };


let countData = 0;
let dataBefore = undefined;

const processMain = (dataNow) => {
    const splitNow = dataNow[countData].split(",");

    const info = { timestamp: splitNow.shift() };

    const graph = {
        dangerCount: 0,
        inactiveCount: 0
    };

    const sensors = splitNow.map((value, i) => {
        let [ship, magto] = value.slice(1, value.length - 1).split("|");
        magto = Number(magto);

        let proximity = { count: 1, type: '' };
        let alert = { type: '' };

        if (magto === 0) {
            // Fallo en el sensor. (Opción 3-4)
            proximity.type = "inactive";

            if (dataBefore) {
                proximity.count = dataBefore.sensors[i].proximity.type === "danger" ? 1 : dataBefore.sensors[i].proximity.count + 1;

                if (proximity.count >= 32) {
                    alert.type = 2;
                    ++graph.inactiveCount;
                } else {
                    alert.type = 1;
                }
            }

            // console.log(`➖ Sensor inactivo con ${proximity.count}sg: ${proximity.count >= 32 ? 'ALERTA' : ''} `);
        } else if (magto >= 100) {
            // Nave rebelde. (Opción 1)
            proximity.type = "danger";

            if (dataBefore) {
                proximity.count = dataBefore.sensors[i].proximity.type === "inactive" ? 1 : dataBefore.sensors[i].proximity.count + 1;

                if (proximity.count >= 30) {
                    alert.type = 2;
                    ++graph.dangerCount;
                } else {
                    alert.type = 1;
                }
            }

            // console.log(`⛔ Nave enemiga con ${proximity.count}sg: ${proximity.count >= 30 ? 'ALERTA' : ''}`);
        } else {
            // Nave de la estrella de la muerte. (Opción 2)

            proximity.count = 0;
            // console.log(`✅ Nave aliada`);
        }

        const saveInfo = { ship, magto, proximity, alert };
        return saveInfo;
    });

    info.position = ++countData;
    info.sensors = sensors;
    info.graph = graph;

    dataBefore = info;
    if (countData == 60) {
        dataBefore = undefined;
        countData = 0;
    }

    return countData;
};

const getBefore = () => {
    return dataBefore;
}

module.exports = {
    processMain,
    getBefore
}