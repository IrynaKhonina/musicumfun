import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {handleErrors} from "@/common/utils/handleErrors.ts";
import {AUTH_KEYS} from "@/common/constants/constants.ts";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Playlist', 'Auth'],
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                'API-KEY': import.meta.env.VITE_API_KEY,
            },
            prepareHeaders: headers => {
                const accessToken = localStorage.getItem(AUTH_KEYS.accessToken)
                if (accessToken) {
                    headers.set('Authorization', `Bearer ${accessToken}`)
                }
                return headers
            },

        })(args, api, extraOptions)

        if (result.error) {
            handleErrors(result.error)
        }

        return result
    },
    endpoints: () => ({}),
})