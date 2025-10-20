import type { RootState } from '@/app/model/store.ts'
import { useSelector } from 'react-redux'
import {tracksApi} from "@/features/tracks/api/tracksApi.ts";
import {playlistsApi} from "@/features/playlists/api/playlistsApi.ts";



const excludedEndpoints = [
    playlistsApi.endpoints.fetchPlaylists.name,
    tracksApi.endpoints.fetchTracks.name,
]
export const useGlobalLoading = () => {
    return useSelector((state: RootState) => {
        // Получаем все активные запросы из RTK Query API
        const queries = Object.values(state.baseApi.queries || {})
        const mutations = Object.values(state.baseApi.mutations || {})

        // Проверяем, есть ли активные запросы (статус 'pending')
        const hasActiveQueries = queries.some(query => {
            if (query?.status !== 'pending') return
            if (excludedEndpoints.includes(query.endpointName)) {
                const completedQueries = queries.filter(q => q?.status === 'fulfilled')
                return completedQueries.length > 0
            }
        })

        const hasActiveMutations = mutations.some(mutation => mutation?.status === 'pending')

        return hasActiveQueries || hasActiveMutations
    })
}