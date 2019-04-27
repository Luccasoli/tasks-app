const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('/')
    res.status(200).send('<h1>Bora de express!</h1>')
})

app.listen(3000, () => {
    console.log('Servidor em execução.')
})