import {useState, useContext} from "react";
import { LoginContext} from "../contexts/LoginContext.jsx";


export default function Login () {
    const { setUsername, setShowProfile } = useContext(LoginContext);
    return (
        <div>
            {/*<form>*/}
                <input
                    type={"text"}
                    placeholder={"Username"}
                    onChange = {e => setUsername(e.target.value)}
                />
                <input type={"text"} placeholder={"Password"} />
                <button
                    onClick={() => setShowProfile(true)}
                >Login</button>
            {/*</form>*/}
        </div>
    )
}
