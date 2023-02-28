const envConfig = require('./env.config');
module.exports = {
    mongodb: {
        uri: `mongodb+srv://ecommerce:${envConfig.DB_PASSWORD}@cluster0.hjesg.mongodb.net/${envConfig.DB_NAME}?retryWrites=true&w=majority`
    }
}