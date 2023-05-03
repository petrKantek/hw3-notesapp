const pgp = require('pg-promise')(/* options */)
// change the connection string below to Azure App Service connection string from env variables

const db = pgp(`postgres://${process.env.AZURE_POSTGRESQL_USER}:${process.env.AZURE_POSTGRESQL_PASSWORD}@${process.env.AZURE_POSTGRESQL_HOST}:${process.env.AZURE_POSTGRESQL_PORT}/${process.env.AZURE_POSTGRESQL_DATABASE}?ssl=${process.env.AZURE_POSTGRESQL_SSL}`)

module.exports = db;