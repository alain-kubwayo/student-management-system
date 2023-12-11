import Log from './views/Log.jsx';
import {useState} from "react";
import Profile from "./views/Profile.jsx";
import { LoginContext } from "./contexts/LoginContext.jsx"



function App() {
const [showProfile, setShowProfile] = useState(false);
const [username, setUsername] = useState("");
  return (
    <div>
        <LoginContext.Provider value={{ username, setUsername, setShowProfile }}>
            {showProfile ? <Profile /> : <Log />}
        </LoginContext.Provider>
    </div>
  )
}

export default App
