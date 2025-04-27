import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONRESPONSE.js'
import { getDataByPathParams } from './utils/getDataByPathParams.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'
import { getLastPathParam } from './utils/getLastPathParam.js'

const PORT = 8000

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  const urlObj = new URL(req.url, `http://${req.headers.host}`)
  const queryObj = Object.fromEntries(urlObj.searchParams)

  if (urlObj.pathname === '/api' && req.method === 'GET') {
    let filteredDestinations = getDataByQueryParams(destinations, queryObj)

    sendJSONResponse(res, 200, filteredDestinations)
  } else if (urlObj.pathname.startsWith('/api/continent')) {
    const continent = getLastPathParam(urlObj)

    const filteredDestination = getDataByPathParams(
      destinations,
      'continent',
      continent
    )

    sendJSONResponse(res, 200, filteredDestination)
  } else if (
    urlObj.pathname.startsWith('/api/country') &&
    req.method === 'GET'
  ) {
    const country = getLastPathParam(urlObj)

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
