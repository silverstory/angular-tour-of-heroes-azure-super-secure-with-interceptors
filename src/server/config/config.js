const secrets = require("./secrets.js");
module.exports = {
    DB_HOST: secrets.get("DB_HOST") || process.env.DB_HOST,
    DB_NAME: secrets.get("DB_NAME") || process.env.DB_NAME,
    DB_USER_NAME: secrets.get("DB_USER_NAME") || process.env.DB_USER_NAME,
    DB_PASSWORD: secrets.get("DB_PASSWORD") || process.env.DB_PASSWORD,
    JWT_SECRET: secrets.get("JWT_SECRET") || process.env.JWT_SECRET,
    DB_MODE: secrets.get("DB_MODE") || process.env.DB_MODE
};