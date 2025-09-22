import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types.ts";

import {PlaylistCover} from "@/features/playlists/ui/PlaylistItem/PlaylistCover.tsx";
import {PlaylistDescription} from "@/features/playlists/ui/PlaylistItem/PlaylistDescription/PlaylistDescription.tsx";

type Props = {
    playlist: PlaylistData
    deletePlaylist: (playlistId: string) => void
    editPlaylist: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({playlist, editPlaylist, deletePlaylist}: Props) => {



    return (
        <div>

            <PlaylistCover
                playlistId={playlist.id}
                images={playlist.attributes.images}
            />

            <PlaylistDescription attributes={playlist.attributes} />

            <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
            <button onClick={() => editPlaylist(playlist)}>update</button>
        </div>
    )
}