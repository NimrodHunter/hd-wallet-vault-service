const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {account, transaction} = require('./controllers');

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));

app.post('/account', account.create);

app.post('/transaction/sign', transaction.sign);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});

module.exports = app;
