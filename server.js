import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONRESPONSE.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  if (req.url === '/api' && req.method === 'GET') {
    sendJSONResponse(res, 200, destinations)
  } else if (req.url.startsWith('/api/continent')) {
    const continent = req.url.split('/').pop()

    const filteredDestination = getDataByPathParams(
      destinations,
      'continent',
      continent
    )

    sendJSONResponse(res, 200, filteredDestination)
  } else if (req.url.startsWith('/api/country') && req.method === 'GET') {
    const country = req.url.split('/').pop()

    const filteredCountry = getDataByPathParams(
      destinations,
      'country',
      country
    )

    sendJSONResponse(res, 200, filteredCountry)
  } else {
    sendJSONResponse(res, 404, {
      error: 'Not found',
      message: 'The requested route does not exist'
    })
  }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
