var request = require('request');
const express = require('express')
const app = express()
const port = 3000

// const apiUrl = 'api.integracommerce.com.br'
// const apiKey = '72e148a7-35bc-41ac-b968-0101cd21bdc9'
// const clientId = '2OZPBrxw5aLXNDZUdoVIal4CO87jfls47xbSYn618yQ'
// const userName = 'xsellerntcst50xapi'
// const password = 'SBinB8SGxRuLHhBlrpPQ'


// Inicializa o endpoint OAuth2
app.post('/', (req, res) => {

  console.log("Endpoint de Iniciação foi chamado com sucesso.")

  const options = {
    'method': 'POST',
    'url': 'https://api.integracommerce.com.br/api/v1/oauth2/rollout/initialize',
    'headers': {
      'x-api-key': '72e148a7-35bc-41ac-b968-0101cd21bdc9',
      'Content-Type': 'application/json',
      'Authorization': 'Basic eHNlbGxlcm50Y3N0NTB4YXBpOlNCaW5COFNHeFJ1TEhoQmxycFBR'
    },
    body: JSON.stringify({
      "client_id": "2OZPBrxw5aLXNDZUdoVIal4CO87jfls47xbSYn618yQ"
    })

  };
  request(options, function (error, response) {
    if (error) throw new Error(error)
    res.send(response.body)
  })
})

// Inicializa o endpoint verificação de Status
app.get('/', (req, res) => {

  console.log("Endpoint de Status foi chamado com sucesso.")

  const options = {
    'method': 'GET',
    'url': 'https://api.integracommerce.com.br/api/v1/oauth2/callback/status?clientId=2OZPBrxw5aLXNDZUdoVIal4CO87jfls47xbSYn618yQ&username=xsellerntcst50xapi',
    'headers': {
      'x-api-key': '72e148a7-35bc-41ac-b968-0101cd21bdc9',
      'Authorization': 'Basic eHNlbGxlcm50Y3N0NTB4YXBpOlNCaW5COFNHeFJ1TEhoQmxycFBR'
    }
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})