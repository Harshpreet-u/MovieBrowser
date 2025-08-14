const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("mongodb connection successful");
    }).catch((err) => {
        console.log("mongodb connection unsuccessful, got error", err);
    })