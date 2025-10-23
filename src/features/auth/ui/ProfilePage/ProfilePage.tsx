import {useGetMeQuery} from "@/features/auth/api/authApi.ts";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi.ts";
import {PlaylistsList} from "@/features/playlists/ui/PlaylistsList/PlaylistsList.tsx";
import {CreatePlaylistForm} from "@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm.tsx";
import s from './ProfilePage.module.css'
import {Navigate} from "react-router";
import {Path} from "@/common/routing/Routing.tsx";

export const ProfilePage = () => {
    const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery()


    const { data: playlistsResponse, isLoading } = useFetchPlaylistsQuery(
        { userId: meResponse?.userId },
        { skip: !meResponse?.userId }
    )


    if (isLoading || isMeLoading) return <h1>Skeleton loader...</h1>
    if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />


    return (
        <>
            <h1>{meResponse?.login} page</h1>
            <div className={s.container}>
                <CreatePlaylistForm />
                <PlaylistsList playlists={playlistsResponse?.data || []} isPlaylistsLoading={isLoading} />
            </div>
        </>
    )
}