import { NavLink } from 'react-router'
import s from './Header.module.css'
import {Path} from "@/common/routing/Routing.tsx";
import {useGetMeQuery} from "@/features/auth/api/authApi.ts";
import {Login} from "@/features/auth/ui/Login/Login.tsx";


const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.Playlists, label: 'Playlists' },
    { to: Path.Tracks, label: 'Tracks' },
    { to: Path.Profile, label: 'Profile' },
]

export const Header = () => {
    const { data } = useGetMeQuery()
    return (
        <header className={s.container}>
            <nav>
                <ul className={s.list}>
                    {navItems.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => `link ${isActive ? s.activeLink : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            {data && data.login}
            {!data && <Login />}
        </header>
    )
}
