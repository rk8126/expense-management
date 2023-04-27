const reimbursementModel = require('../models/reimbursementModel')
const employeeModel = require('../models/employeeModel')
const { REIMBURSEMENT_STATUS, EXPENSE_PROOF_FOLDER_NAME, EXPENSE_PROOF_FILE_NAME } = require('../utils/const')
const awsS3Service = require('./awsS3Service')

module.exports = {
    claimReimbursement: async (body, file) => {
        const {employeeId, dateOfExpense, claimType, claimMonth, claimYear, amount} = body
        const employee = await employeeModel.findById(employeeId)
        if(!employee || employee.isDeleted){
            return {status: false, code: 404, message: "employee not found"}
        }
        const uploadedFile = await awsS3Service.upload(file, EXPENSE_PROOF_FOLDER_NAME, `${EXPENSE_PROOF_FILE_NAME}-${employeeId}`)
        const url = uploadedFile.Location
        const data = await reimbursementModel.create({employee: employeeId, dateOfExpense, claimType, claimMonth, claimYear, amount, expenseProof: url})
        return {status: true, code: 201, data}
    },
    approveReimbursement: async (body) => {
        const {employeeId, approverId, reimbursementId} = body
        const [employee,approver] = await Promise.all([
            employeeModel.findById(employeeId),
            employeeModel.findById(approverId),
        ])
        if(!employee || employee.isDeleted){
            return {status: false, code: 404, message: "employee not found"}
        }
        if(!approver || approver.isDeleted){
            return {status: false, code: 404, message: "approver not found"}
        }
        const reimbursement = await reimbursementModel.findByIdAndUpdate(reimbursementId, {status: REIMBURSEMENT_STATUS.paid, approver: approverId})
        if(!reimbursement){
            return {status: false, code: 404, message: "reimbursement not found"}
        }
        return {status: true, code: 200, data: reimbursement}
    },
    getReimbursementHistory: async (employeeId, status) => {
        const employee = await employeeModel.findById(employeeId)
        if(!employee || employee.isDeleted){
            return {status: false, code: 404, message: "employee not found"}
        }
        const data = await reimbursementModel.find({employee: employeeId, ...(status && {status})})
        if(!data?.length){
            return {status: false, code: 404, message: "No reimbursement found"}
        }
        return {status: true, code: 200, data}
    },
    getReimbursementDetails: async (reimbursementId) => {
        const reimbursement = await reimbursementModel.findById(reimbursementId)
        if(!reimbursement){
            return {status: false, code: 404, message: "reimbursement not found"}
        }
        return {status: true, code: 200, data: reimbursement}
    }
}