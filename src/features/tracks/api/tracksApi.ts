import {baseApi} from "@/app/api/baseApi.ts";
import type {FetchTracksResponse} from "@/features/tracks/api/tracksApi.types.ts";
import {withZodCatch} from "@/common/utils/withZodCatch.ts";
import {fetchTracksResponseSchema} from "@/features/tracks/model/tracks.schemas.ts";

export const tracksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTracks: build.infiniteQuery<FetchTracksResponse, void, number>({
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, _allPages, lastPageParam) => {
                    return lastPageParam < (lastPage.meta as { pagesCount: number }).pagesCount
                        ? lastPageParam + 1
                        : undefined
                },
            },
            ...withZodCatch(fetchTracksResponseSchema),
            query: ({ pageParam }) => {
                return {
                    url: 'playlists/tracks',
                    params: { pageNumber: pageParam, pageSize: 10, paginationType: 'offset' },
                }
            },
        }),
    }),
})

export const { useFetchTracksInfiniteQuery } = tracksApi