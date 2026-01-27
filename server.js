const express = require("express");
const app = express();
const mongodb = require("./data/database.js");

const port = process.env.PORT || 3000;

app.use("/", require("./routes"));

mongodb.initDb( (err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Data base is listening and running in port ${port}`);
        })
    }
});


