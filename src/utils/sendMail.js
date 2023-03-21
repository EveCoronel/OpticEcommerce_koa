const sgMail = require('@sendgrid/mail')
const envConfig = require("../config/env.config");
const logger = require("../logs/logger");

sgMail.setApiKey(envConfig.SENDGRID_APIKEY)

const sendMail = (to, subject, message) => {

    const msg = {
        to, // Change to your recipient
        from: envConfig.SENDGRID_EMAIL, // Change to your verified sender
        subject,
        text: message
    }
    sgMail
        .send(msg)
        .then(() => {
            logger.info("Email sent successfully!!")
        })
        .catch((error) => {
            logger.error(`Unexpected error while sending mail ${error.message}`)
        })

}

module.exports = sendMail;




