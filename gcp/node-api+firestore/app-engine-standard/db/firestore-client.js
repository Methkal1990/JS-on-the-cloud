const {Firestore} = require('@google-cloud/firestore');

// Create a new client
const firestore = new Firestore();
module.exports= firestore;
