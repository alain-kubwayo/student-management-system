import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout () {
    const {token} = useStateContext();
    // debugger;
    if(!token) {
        return <Navigate to="/login" />
    }


    return (
        <div>
            <h1>Default</h1>
            <Outlet />
        </div>
    )
}
