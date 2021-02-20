import type { NextApiRequest, NextApiResponse } from 'next'

import { api } from '../../../services/api'

export default async function climate(request: NextApiRequest, response: NextApiResponse) {
    let responseLocation = await api.get("locations/v1/cities/search", {
        params: {
            apikey: process.env.WEATHER_API_KEY,
            q: request.query.city
        }
    })

    if (responseLocation.data.length > 0) {
        let responseConditions = await api.get(`currentconditions/v1/${responseLocation.data[0].Key}`, {
            params: {
                apikey: process.env.WEATHER_API_KEY,
                language: "pt-br"
            }
        })

        if (responseConditions.status == 200) {
            response.status(200).json(responseConditions.data)
        } else {
            response.status(500)
        }
    }
}