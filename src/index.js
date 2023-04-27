require("dotenv").config()

require('./expressServer')

// TODO: Please add DATABASE_URL in env file for the connection of database then uncomment below code

// const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//     .then(() => console.log('mongodb running on 27017'))
//     .catch(err => console.log(err))