const express = require('express')
const router = express.Router()

const reimbursementController = require('../controllers/reimbursementController')

// before claim reimbursement add aws keys in env file for the aws configuration
router.post('/', reimbursementController.claimReimbursement)
router.put('/approve', reimbursementController.approveReimbursement)
router.get('/history', reimbursementController.getReimbursementHistory)
router.get('/:reimbursementId/details', reimbursementController.getReimbursementDetails)

module.exports = router