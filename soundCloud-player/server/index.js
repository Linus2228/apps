const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');

const app = express();

app.use( bodyParser.json() );

app.use(cors({ origin: '*' }));

app.listen(8080, function () {
  console.log("\\('o')/");
});