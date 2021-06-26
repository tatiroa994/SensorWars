const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
    io.on('connection', function (socket) {
        console.log("Connected succesfully to the socket ...");

        var news = [
            { title: 'The cure of the Sadness is to play Videogames', date: '04.10.2016' },
            { title: 'Batman saves Racoon City, the Joker is infected once again', date: '05.10.2016' },
            { title: "Deadpool doesn't want to do a third part of the franchise", date: '05.10.2016' },
            { title: 'Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales', date: '04.10.2016' },
        ];

        // Send news on the socket
        socket.emit('news', news);
    });

    res.json();
});

app.listen(3030, () => {
    console.log(`Escuchando en http://localhost:${3030}`);
});
