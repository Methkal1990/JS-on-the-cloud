// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();


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

app.use("/api/v1/resources", resources);


exports.simplenode = functions.https.onRequest(app);
