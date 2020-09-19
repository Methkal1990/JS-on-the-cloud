const express = require("express");
const resources = require("./routes/resources");
const morgan = require("morgan")

// create an express app instance
const app = express()

app.use(express.json())

app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send(`
    requests should be:
    GET /api/v1/resources
    GET /api/v1/resources/:id
    POST /api/v1/resources
    PUT /api/v1/resources/:id
    DELETE /api/v1/resources/:id
    `)
});


app.use("/api/v1/resources", resources)

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Listening on port ${port}`));