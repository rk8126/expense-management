const employeeService = require('../services/employeeService')
const { isValidEmail, isValidPassword } = require('../utils/validation')

module.exports = {
    addEmployee: async (req, res) => {
        try{
            let {name, email, password} = req.body
            name = name?.trim()
            email = email?.trim()
            password = password?.trim()
            if(!name){
                return res.status(400).send({ status: false, message: "name is required" })
            }
            if(!email || !isValidEmail(email)){
                return res.status(400).send({ status: false, message: "email is required and should be a valid email" })
            }
            if(!password || !isValidPassword(password)){
                return res.status(400).send({ status: false, message: "password is required and should be contained min 8 and max 16 character" })
            }
            const {status, code, data, message} = await employeeService.addEmployee(req.body)
            res.status(code).send({status, ...(data && {data}), ...(message && {message})})
        }catch(error){
            console.error(`Error in addition of employee with this email-${req.body?.email}`, error.message)
            res.status(500).send({ status: false, message: error.message })
        }
    }
}