const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
const SALT_ROUNDS = 10
const PASSWORD_MIN_LENGTH = 8
const PASSWORD_MAX_LENGTH = 16
const MONTHS = {
    january: "january",
    february: "february",
    march: "march",
    april: "april",
    may: "may",
    june: "june",
    july: "july",
    august: "august",
    september: "september",
    october: "october",
    november: "november",
    december: "december"
}

const REIMBURSEMENT_STATUS = {paid: 'paid', unpaid: 'unpaid'}

const EXPENSE_PROOF_FOLDER_NAME = "Expense/Proof/"
const EXPENSE_PROOF_FILE_NAME = "Reimbursement-Expense-Proof"

module.exports = {
    EMAIL_REGEX,
    SALT_ROUNDS,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    MONTHS,
    REIMBURSEMENT_STATUS,
    EXPENSE_PROOF_FOLDER_NAME,
    EXPENSE_PROOF_FILE_NAME
}