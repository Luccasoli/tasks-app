const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).send('<h1>Bora de express!</h1>')
})

app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}.`)
})