import {Link, Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout () {
    const {user, token, setUser, setToken, notification} = useStateContext();
    // debugger;
    if(!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
            })
    }

    useEffect(() => {
        axiosClient('/user')
            .then(({data}) => {
                setUser(data);
            })
    }, []);


    return (
        <div id="default-layout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                { notification && (
                    <div>{notification}</div>
                )}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
