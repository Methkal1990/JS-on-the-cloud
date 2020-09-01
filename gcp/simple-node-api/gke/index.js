const express = require("express");
const resources = require("./routes/resources");


const app = express();

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

const port = process.env.PORT || 8080;

app.listen(port, console.log(`Listening on port ${port}`));