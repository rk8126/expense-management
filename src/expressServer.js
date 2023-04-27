const app = require('./server').app

//routes
app.get('/', (req, res) => res.send("Running Expense Management Succesfully"));
app.use('/employee', require('./app/routes/employeeRoute'));
app.use('/reimbursement', require('./app/routes/reimbursementRoute'))

module.exports.app = app