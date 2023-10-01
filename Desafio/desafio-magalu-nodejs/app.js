const express = require('express')
const app = express()
const port = 3000

app.post('/', (req, res) => {
  res.send('Olá Mundo post!!')
})

app.get('/', (req, res) => {
  res.send('Olá Mundo!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
