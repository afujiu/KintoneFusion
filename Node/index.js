// express
const express = require(`express`)
const app = express()
const cors = require(`cors`)
const request = require(`request`)
app.listen(9999, () => {
  console.log(`KintoneFusion`)
})
app.use(express.static(`./front`));
app.use(express.urlencoded({ extended: true, limit: `1000mb` }))
app.use(express.json({ extended: true, limit: `1000mb` }))
app.use(cors())
app.post(`/lists`, async (req, res, next) => {
  const url = req.url
  const appId = req.appid
  const logindId = req.loginId
  const password = req.password
  const query = req.query
  let limit = 500
  list = []
  let func = (res, offset, list) => {
    request(
      {
        url: url,
        method: 'GET',
        headers: {
          'Content-type': `application/json`,
          'X-Cybozu-Authorization': Buffer.from(`${logindId}:${password}`).toString('base64'),
        },
        json: true,
        body: {
          'query': `${query} limit ${limit} offset ${1 + (offset * limit)}`,
          'app': appId,
        }
      }, (err, req, data) => {
        list = list.concat(data.records)
        if (data.records.length != limit || offset > 20) {
          res.json(list)
          res.end()
        } else {
          func(res, offset + 1, list)
        }
      }
    )

  }
  func(res, 0, list)
})
