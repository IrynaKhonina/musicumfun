import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {toast} from "react-toastify";
import {isErrorWithMessage} from "@/common/utils/isErrorWithMessage.ts";
import {isErrorWithError} from "@/common/utils/isErrorWithError.ts";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Playlist'],
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            headers: {
                'API-KEY': import.meta.env.VITE_API_KEY + 'abc',
            },
            prepareHeaders: headers => {
                headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
                return headers
            },
        })(args, api, extraOptions)

        if (result.error) {
            switch (result.error.status) {
                case 404:
                    if (isErrorWithError(result.error.data)) {
                        toast(result.error.data.error, { type: 'error', theme: 'colored' })
                    } else {
                        toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
                    }
                    break

                case 429:
                    if (isErrorWithMessage(result.error.data)) {
                        toast(result.error.data.message, { type: 'error', theme: 'colored' })
                    } else {
                        toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
                    }
                    break

                default:
                    toast('Some error occurred', { type: 'error', theme: 'colored' })
            }
        }

        return result
    },
    endpoints: () => ({}),
})