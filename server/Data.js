const mongoose = require("mongoose");

const Data = new mongoose.Schema({
    timestamp: Number,
    sensors: [
        {
            ship: String,
            magto: Number,
            proximity: {
                count: {
                    type: Number,
                    default: 0
                },
                type: {
                    type: String,
                    default: ''
                }
            }
        }
    ]
});

module.exports = mongoose.model('data', Data);