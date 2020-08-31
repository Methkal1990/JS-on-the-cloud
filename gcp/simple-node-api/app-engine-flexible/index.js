const express = require("express");
const resources = require("./routes/resources");


const app = express();

app.use("/api/v1/resources", resources)

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}`));