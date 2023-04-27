const {EMAIL_REGEX, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH} = require('./const')

const isValidEmail = (email)=> {
    return EMAIL_REGEX.test(email)
}

const isValidPassword = (password) => {
    return password?.length>=PASSWORD_MIN_LENGTH && password?.length<=PASSWORD_MAX_LENGTH
}

module.exports = {
    isValidEmail,
    isValidPassword
}