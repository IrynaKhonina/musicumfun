import type {CreatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types.ts";
import {useForm} from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import {useCreatePlaylistMutation} from "@/features/playlists/api/playlistsApi.ts";


export const CreatePlaylistForm = () => {

    const {register, handleSubmit} = useForm<CreatePlaylistArgs>()
    const [createPlaylist] = useCreatePlaylistMutation()


    const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
        createPlaylist(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'}/>
            </div>
            <div>
                <input {...register('description')} placeholder={'description'}/>
            </div>
            <button>create playlist</button>
        </form>
    )
}