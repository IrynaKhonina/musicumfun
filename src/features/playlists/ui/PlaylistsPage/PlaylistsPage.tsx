import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi.ts";
import s from './PlaylistsPage.module.css'
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx";
import {type ChangeEvent, useState} from "react";
import {useDebounceValue} from "@/common/hooks/useDebounceValue.ts";
import {Pagination} from "@/common/components/Pagination/Pagination.tsx";
import {PlaylistsList} from "@/features/playlists/ui/PlaylistsList/PlaylistsList.tsx";
import {LinearProgress} from "@/common/components/LinearProgress/LinearProgress.tsx";

export const PlaylistsPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const [search, setSearch] = useState('')
    const debounceSearch = useDebounceValue(search)

    const {data, isLoading,isFetching} = useFetchPlaylistsQuery({
            search: debounceSearch,
            pageNumber: currentPage,
            pageSize,
        },

    // {
    //     pollingInterval: 3000,
    //         skipPollingIfUnfocused: true,
    // }
    )


    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setCurrentPage(1)
    }

    if (isLoading) return <h1>Skeleton loader   ...</h1>

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <input
                type="search"
                placeholder={'Search playlist by title'}
                onChange={searchPlaylistHandler}
            />
            <PlaylistsList playlists={data?.data || []} isPlaylistsLoading={isLoading}/>
            {isFetching && <LinearProgress />}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={data?.meta.pagesCount || 1}
                pageSize={pageSize}
                changePageSize={changePageSizeHandler}
            />
        </div>
    )
}