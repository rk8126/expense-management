const employeeModel = require('../models/employeeModel')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../utils/const')

module.exports = {
    addEmployee: async (body) => {
        const {name, email, password} = body
        const isEmailExists = await employeeModel.findOne({email})
        if(isEmailExists){
            return {status: false, code: 400, message: "email already exists"}
        }
        const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);
        const employee = await employeeModel.create({name, email, password: hashedPassword})
        return {status: true, code: 201, data: employee}
    }
}