import type {
    CreatePlaylistArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/baseApi.ts";

export const playlistsApi = baseApi.injectEndpoints({


    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => ({ url: `playlists` }),
            providesTags: ['Playlist'],
        }),

        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: body => ({ url: 'playlists', method: 'post', body }),
            invalidatesTags: ['Playlist'],
        }),

        deletePlaylist: build.mutation<void, string>({
            query: playlistId => ({ url: `playlists/${playlistId}`, method: 'delete' }),
            invalidatesTags: ['Playlist'],
        }),

        updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
            query: ({ playlistId, body }) => ({ url: `playlists/${playlistId}`, method: 'put', body }),
            invalidatesTags: ['Playlist'],
        }),
    }),
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation, useUpdatePlaylistMutation
} = playlistsApi