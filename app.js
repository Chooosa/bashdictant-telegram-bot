const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')

const bodyParser = require('body-parser')
// const { urlencoded } = require('body-parser')

app.use(bodyParser.json())
app.use(cors())


app.post('/message', (req, res) => {
   // console.log(req.body)
   const message = req.body
   const device = JSON.parse(message.device)
   let fields = [
      `<b>Route</b>: ${message.route}`,
      `<b>Error</b>: ${message.error} `,
      `<b>Date</b>: ${message.date} `,
      `<b>Time</b>: ${message.time} `,
      `<b>Device</b>: `,
      `     <b>Is browser</b>: ${device.isBrowser}`,
      `     <b>Browser major version</b>: ${device.browserMajorVersion}`,
      `     <b>Browser full version</b>: ${device.browserFullVersion}`,
      `     <b>Browser name</b>: ${device.browserName}`,
      `     <b>Engine name</b>: ${device.engineName}`,
      `     <b>Engine version</b>: ${device.engineVersion}`,
      `     <b>Os name</b>: ${device.osName}`,
      `     <b>Os version</b>: ${device.osVersion}`,
      `     <b>User agent</b>: ${device.userAgent}`,
   ]
   let msg = `<b><i>Errors log(front)</i></b>: ${message.projectName}\n\n`

   fields.forEach(field => {
      msg += field + '\n'
   });
   msg = encodeURI(msg)

   axios.post(`https://api.telegram.org/bot${message.bot.token}/sendMessage?chat_id=${message.bot.chat}&parse_mode=html&text=${msg}`)
      .then((res) => {
         console.log('Ok')
         res.status(200).send('OK')
      })
      .catch((err) => {
         console.log('err: ', err)
         res.status(200).send('Message not sent')
      })
})

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})