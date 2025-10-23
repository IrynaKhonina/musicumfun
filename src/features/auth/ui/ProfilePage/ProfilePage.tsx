import {useGetMeQuery} from "@/features/auth/api/authApi.ts";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi.ts";
import {PlaylistsList} from "@/features/playlists/ui/PlaylistsList/PlaylistsList.tsx";

export const ProfilePage = () => {
    const { data: meResponse } = useGetMeQuery()
    const { data: playlistsResponse, isLoading } = useFetchPlaylistsQuery({
        userId: meResponse?.userId,
    })

    return (
        <div>
            <h1>{meResponse?.login} page</h1>
            <PlaylistsList playlists={playlistsResponse?.data || []} isPlaylistsLoading={isLoading} />
        </div>
    )
}