import type { NextApiRequest, NextApiResponse } from 'next'

import { api } from '../../../services/api'

export default async function climate(request: NextApiRequest, response: NextApiResponse) {
    await api.get("locations/v1/cities/search", {
        params: {
            apikey: process.env.WEATHER_API_KEY,
            q: request.query.city
        }
    }).then(async (responseLocation) => {
        if (responseLocation.data.length > 0) {
            await api.get(`currentconditions/v1/${responseLocation.data[0].Key}`, {
                params: {
                    apikey: process.env.WEATHER_API_KEY,
                    language: "pt-br"
                }
            }).then((responseConditions) => {
                if (responseConditions.status == 200) {
                    response.status(200).json(responseConditions.data)
                } else {
                    response.status(500).json("Server Error")
                }
            }).catch((_error) => {
                response.status(500).json("Server Error")
            })
        } else {
            response.status(404).json("Not found")
        }
    }).catch((_error) => {
        response.status(500).json("Server Error")
    })
}