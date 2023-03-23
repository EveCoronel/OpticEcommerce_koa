const sgMail = require('@sendgrid/mail')
const envConfig = require("../config/env.config");
const logger = require("../logs/logger");
let newOrderHtml = require('./newOrderHtml');

sgMail.setApiKey(envConfig.SENDGRID_APIKEY)

const sendMail = (to, subject, message) => {

    const msg = {
        to,
        from: envConfig.SENDGRID_EMAIL,
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

const sendOrderMail = (to, orderPayload) => {

    try {
        let products = orderPayload.products;
        let totalToPay = 0;
        let htmlProduct = ``
        for (let product of products) {
            let monto = product.price * product.cant;
            totalToPay = totalToPay + monto;
            htmlProduct += `<tr>
        <td><h3>${product.title}</h3></td>
        <td><img src="${product.thumbnail}" width="150px" height="150px" alt="Product Thumbnail"></h3></td>
        <td><p>${product.description}</p></h3></td>
        <td>${product.cant}</td>
        <td>$UY${product.price}</td>
        <td>$UY${monto}</td>
    </tr>`
        }

        newOrderHtml = newOrderHtml.replace("<products>", htmlProduct)
        newOrderHtml = newOrderHtml.replace("<orderNumber>", orderPayload.orderNumber);
        newOrderHtml = newOrderHtml.replace("<createdAt>", orderPayload.createdAt);
        newOrderHtml = newOrderHtml.replace("<totalToPay>", totalToPay);
        let msg = {
            to,
            from: envConfig.SENDGRID_EMAIL,
            subject: "New order made!",
            html: newOrderHtml
        }
        sgMail
            .send(msg)
            .then(() => {
                logger.info("Email sent to client successfully!")
            })
            .catch((error) => {
                logger.error(`Unexpected error while sending mail ${error.message}`)
            })
    } catch (error) {
        logger.error(error.message)
    }
}

module.exports = { sendMail, sendOrderMail };




