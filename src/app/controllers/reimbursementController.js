const reimbursementService = require('../services/reimbursementService')
const {isValidObjectId} = require('mongoose')
const { MONTHS, REIMBURSEMENT_STATUS } = require('../utils/const')

module.exports = {
    claimReimbursement: async (req, res) => {
        try{
            const {employeeId, dateOfExpense, claimType, claimMonth, claimYear, amount} = req.body
            if(!employeeId || !isValidObjectId(employeeId)){
                return res.status(400).send({ status: false, message: "employeeId is required and should be a valid objectId" })
            }
            if(!dateOfExpense || !new Date(dateOfExpense)){
                return res.status(400).send({ status: false, message: "dateOfExpense is required and should be a valid date" })
            }
            if(!claimType){
                return res.status(400).send({ status: false, message: "claimType is required" })
            }
            if(!claimMonth || !MONTHS.hasOwnProperty(claimMonth)){
                return res.status(400).send({ status: false, message: "claimMonth is required and should be valid month" })
            }
            if(!claimYear || !Number(claimYear)){
                return res.status(400).send({ status: false, message: "claimYear is required and should be valid year" })
            }
            if(!amount || !Number(amount)){
                return res.status(400).send({ status: false, message: "amount is required and should be valid number" })
            }
            if(!req.files?.length){
                return res.status(400).send({ status: false, message: "expenseProof is required" })
            }
            const {status, code, data, message} = await reimbursementService.claimReimbursement(req.body, req.files[0])
            res.status(code).send({status, ...(data && {data}), ...(message && {message})})
        }catch(error){
            console.error(`Error in claiming reimbursement with this employeeId-${req.body?.employeeId}`, error.message)
            res.status(500).send({ status: false, message: error.message })
        }
    },
    approveReimbursement: async (req, res) => {
        try{
            const {approverId, employeeId, reimbursementId} = req.body
            if(!employeeId || !isValidObjectId(employeeId)){
                return res.status(400).send({ status: false, message: "employeeId is required and should be a valid objectId" })
            }
            if(!approverId || !isValidObjectId(approverId)){
                return res.status(400).send({ status: false, message: "approverId is required and should be a valid objectId" })
            }
            if(!reimbursementId || !isValidObjectId(reimbursementId)){
                return res.status(400).send({ status: false, message: "reimbursementId is required and should be a valid objectId" })
            }
            const {status, code, data, message} = await reimbursementService.approveReimbursement(req.body)
            res.status(code).send({status, ...(data && {data}), ...(message && {message})})
        }catch(error){
            console.error(`Error in approval of reimbursement with this reimbursementId-${req.body?.reimbursementId}`, error.message)
            res.status(500).send({ status: false, message: error.message })
        }
    },
    getReimbursementHistory: async (req, res) => {
        try{
            const {employeeId, status: reimbursementStatus} = req.query
            if(!employeeId || !isValidObjectId(employeeId)){
                return res.status(400).send({ status: false, message: "employeeId is required and should be a valid objectId" })
            }
            if(reimbursementStatus && !REIMBURSEMENT_STATUS.hasOwnProperty(reimbursementStatus)){
                return res.status(400).send({ status: false, message: "status should be a valid value" })
            }
            const {status, code, data, message} = await reimbursementService.getReimbursementHistory(employeeId, reimbursementStatus)
            res.status(code).send({status, ...(data && {data}), ...(message && {message})})
        }catch(error){
            console.error(`Error in fetching reimbursement history with this employeeId-${req.query?.employeeId}`, error.message)
            res.status(500).send({ status: false, message: error.message })
        }
    },
    getReimbursementDetails: async (req, res) => {
        try{
            const reimbursementId = req.params?.reimbursementId
            if(!reimbursementId || !isValidObjectId(reimbursementId)){
                return res.status(400).send({ status: false, message: "reimbursementId is required and should be a valid objectId" })
            }
            const {status, code, data, message} = await reimbursementService.getReimbursementDetails(reimbursementId)
            res.status(code).send({status, ...(data && {data}), ...(message && {message})})
        }catch(error){
            console.error(`Error in fetching reimbursement details with this reimbursementId-${req.params?.reimbursementId}`, error.message)
            res.status(500).send({ status: false, message: error.message })
        }
    }
}