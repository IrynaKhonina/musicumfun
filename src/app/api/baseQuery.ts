
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {AUTH_KEYS} from "@/common/constants/constants.ts";

export const baseQuery = fetchBaseQuery({
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
})