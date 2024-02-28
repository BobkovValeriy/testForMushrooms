import { useState } from "react";
import './style/index.scss';
import LoginedApp from "./loginedapp/LoginedApp";
import Login from "./login/Login.jsx"
import Registration from "./registration/Registration.jsx"
import DifficultChange from "./dificultChange/DifficultChange.jsx";
function App() {
  const [showLoginMenu, setShowLoginMenu] = useState(true);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const [logined, setLogined] = useState(false);
  const [player, setPlayer] = useState('');
  const [pass, setPlayerPass] = useState('');
  const [difficulty, setDifficulty] = useState(10);
  const [changedDifficult, setChangedDifficult] = useState(false);
  const [notChangedDifficult, setNotChangedDifficult] = useState(true);
  const [difficult, setDifficult] = useState({});

  return (
    <div className="main">
      {showLoginMenu ? <Login
        setLogined={setLogined}
        setPlayer={setPlayer}
        setPlayerPass={setPlayerPass}
        player={player} pass={pass}
        setShowLoginMenu={setShowLoginMenu}
        setShowRegisterMenu={setShowRegisterMenu} /> : null}
      {showRegisterMenu ? <Registration
        setLogined={setLogined}
        setPlayer={setPlayer}
        setPlayerPass={setPlayerPass}
        player={player} pass={pass}
        setShowLoginMenu={setShowLoginMenu}
        setShowRegisterMenu={setShowRegisterMenu} /> : null}
      {logined && notChangedDifficult ? <DifficultChange difficulty={difficulty} setDifficulty={setDifficulty} setDifficult={setDifficult} setNotChangedDifficult={setNotChangedDifficult} setChangedDifficult={setChangedDifficult} /> : null}
      {logined && changedDifficult ? <LoginedApp player={player} difficult={difficult} setNotChangedDifficult={setNotChangedDifficult} setChangedDifficult={setChangedDifficult} /> : null}
    </div>
  );
}

export default App;
