# expense-management

# employee-details
const employeeDetails = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  manager: {
    type: ObjectId,
    ref: 'Employee'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
};

# reimbursement-details
const reimbursementDetails = {
    employee: {
        type: ObjectId,
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
        enum: ["paid", "unpaid"],
        default: "unpaid"
    },
    approver: {
        type: ObjectId,
        ref: 'Employee'
    },
    expenseProof: {
        type: String,
        required: true
    }
};