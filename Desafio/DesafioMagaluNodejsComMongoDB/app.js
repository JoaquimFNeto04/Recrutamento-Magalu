const request = require('request')
const express = require('express')
const mongoose = require('mongoose') // Importando mongoose
const fs = require('fs') // Importando o módulo 'fs' para trabalhar com arquivos
const Helpers = require('./helpers')
const app = express()
const port = 3000

const dbUrl = 'mongodb+srv://dev:Magazine123@recrutamentomagalu.kit4xht.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'))
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso.')
})

const apiUrl = 'api.integracommerce.com.br'
const apiKey = '72e148a7-35bc-41ac-b968-0101cd21bdc9'
const clientId = '2OZPBrxw5aLXNDZUdoVIal4CO87jfls47xbSYn618yQ'
const userName = 'xsellerntcst50xapi'
const password = 'SBinB8SGxRuLHhBlrpPQ'

const helpers = new Helpers()

// Função para escrever no arquivo de log (log.txt)
function writeToLogFile(logMessage) {
  const logFile = 'log.txt'

  fs.appendFile(logFile, `${new Date().toISOString()}: ${logMessage}\n`, (err) => {
    if (err) {
      console.error('Erro ao escrever no arquivo de log:', err)
    } else {
      console.log('Log registrado com sucesso no arquivo de log.')
    }
  })
}

// Schema para os registros de log no MongoDB
const logSchema = new mongoose.Schema({
  message: String,
  endpoint: String,
  timestamp: { type: Date, default: Date.now }
})

const Log = mongoose.model('Log', logSchema)

app.post('/', async (req, res) => {
  const encodedCredentials = helpers.ConvertBasic(userName, password)
  console.log("Encoded credentials:", encodedCredentials)

  const options = {
    method: 'POST',
    url: `https://${apiUrl}/api/v1/oauth2/rollout/initialize`,
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encodedCredentials}`
    },
    body: JSON.stringify({
      "client_id": clientId
    })
  }

  request(options, async function (error, response) {
    if (error) throw new Error(error)

    const responseBody = response.body

    // Gravando log no arquivo log.txt
    writeToLogFile('POST Request - ' + responseBody)

    // Gravando log no MongoDB
    const log = new Log({
      message: responseBody,
      endpoint: 'POST',
    })

    try {
      await log.save()
    } catch (err) {
      console.error('Erro ao salvar log no MongoDB:', err)
    }

    res.send(responseBody)
  })
})

app.get('/', async (req, res) => {
  const encodedCredentials = helpers.ConvertBasic(userName, password)
  console.log("Encoded credentials:", encodedCredentials)

  const options = {
    method: 'GET',
    url: `https://${apiUrl}/api/v1/oauth2/callback/status?clientId=${clientId}&username=${userName}`,
    headers: {
      'x-api-key': apiKey,
      'Authorization': `Basic ${encodedCredentials}`
    }
  };

  request(options, async function (error, response) {
    if (error) throw new Error(error)

    const responseBody = response.body

    // Gravando log no arquivo log.txt
    writeToLogFile('GET Request - ' + responseBody)

    // Gravando log no MongoDB
    const log = new Log({
      message: responseBody,
      endpoint: 'GET',
    });

    try {
      await log.save()
    } catch (err) {
      console.error('Erro ao salvar log no MongoDB:', err)
    }

    res.send(responseBody)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
