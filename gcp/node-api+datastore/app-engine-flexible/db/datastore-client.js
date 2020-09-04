const {Datastore} = require('@google-cloud/datastore');

// create a datastore client
const datastore = new Datastore();
module.exports= datastore;

// database schema is just 'name' which is a string