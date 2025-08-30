import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {
    CreatePlaylistArgs,
    PlaylistData,
    PlaylistsResponse, UpdatePlaylistArgs
}
    from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({

    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),

    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => 'playlists'
        }),

        createPlaylist: build.mutation<{data: PlaylistData}, CreatePlaylistArgs>({
            query: body => ({
                url: 'playlists',
                method: 'post',
                body,
            }),
        }),
        deletePlaylist: build.mutation<void, string>({
            query: playlistId => ({
                url: `playlists/${playlistId}`,
                method: 'delete',
            }),
        }),

        updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
            query: ({ playlistId, body }) => ({
                url: `playlists/${playlistId}`,
                method: 'put',
                body,
            }),
        }),
    }),
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation, useUpdatePlaylistMutation
} = playlistsApi