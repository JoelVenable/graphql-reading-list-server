require('dotenv').config();

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema } = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

const db = {
  user: process.env.MONGO_DB_USER,
  password: encodeURIComponent(process.env.MONGO_DB_PASSWORD),
  server: process.env.MONGO_DB_SERVER
}

mongoose.connect(encodeURI(`mongodb+srv://${db.user}:${db.password}@${db.server}`));
mongoose.connection.once('open', () => {
  console.log("Connected");
});


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Now listening on port 4000.");
});


