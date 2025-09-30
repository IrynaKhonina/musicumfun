import {baseApi} from "@/app/baseApi.ts";
import type {FetchTracksResponse} from "@/features/tracks/api/tracksApi.types.ts";

export const tracksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | undefined>({
            infiniteQueryOptions: {
                initialPageParam: undefined,
                getNextPageParam: lastPage => {
                    return lastPage.meta.nextCursor || undefined
                },
            },
            query: ({ pageParam }) => {
                return {
                    url: 'playlists/tracks',
                    params: { cursor: pageParam, pageSize: 5, paginationType: 'cursor' },
                }
            },
        }),
    }),
})
export const { useFetchTracksInfiniteQuery } = tracksApi