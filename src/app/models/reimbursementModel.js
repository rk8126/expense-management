const mongoose = require('mongoose');
const { REIMBURSEMENT_STATUS } = require('../utils/const');

const reimbursementSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    dateOfExpense: {
        type: Date,
        required: true
    },
    claimType: {
        type: String,
        required: true
    },
    claimMonth: {
        type: String,
        required: true
    },
    claimYear: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(REIMBURSEMENT_STATUS),
        default: REIMBURSEMENT_STATUS.unpaid
    },
    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    expenseProof: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Reimbursement', reimbursementSchema);