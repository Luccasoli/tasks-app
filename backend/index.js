const express = require('express')
const app = express()
const consign = require('consign')
const db = require('./config/db')

const PORT = 3000

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db = db

app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}.`)
})