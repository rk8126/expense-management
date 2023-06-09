const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().any());

app.listen(3000)
console.log("Server running on 3000")

module.exports.app = app;