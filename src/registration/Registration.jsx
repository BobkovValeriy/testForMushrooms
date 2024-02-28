import { useEffect, useState } from "react";
import "./Registration.scss";
import axios from "axios";

function Registration({
  setLogined,
  setPlayer,
  setPlayerPass,
  player,
  pass,
  setShowLoginMenu,
  setShowRegisterMenu,
}) {
  const [passCheck, setPassCheck] = useState("");
  const [passwordsMatching, setPasswordsMatching] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  async function handleRegistration(e) {
    e.preventDefault();

    if (pass !== passCheck) {
      setPasswordsMatching(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://rowan-jumbled-willow.glitch.me/register",
        {
          name: player,
          pass: pass,
        }
      );

      if (response.status === 201) {
        setLogined(true);
        setShowLoginMenu(false);
        setShowRegisterMenu(false);
      } else {
        console.error("Ошибка при регистрации:", response.data.error);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error.message);
    }
  }

  function userNameChange(e) {
    e.preventDefault();
    setPlayer(e.target.value);
  }

  function userPassChange(e) {
    e.preventDefault();
    setPlayerPass(e.target.value);
  }

  function passCheckChange(e) {
    e.preventDefault();
    setPassCheck(e.target.value);
    setPasswordsMatching(true); // Сбрасываем состояние совпадения паролей при изменении поля
  }

  function showLogin(e) {
    e.preventDefault();
    setShowLoginMenu(true);
    setShowRegisterMenu(false);
  }

  useEffect(() => {
    if (pass !== passCheck) setPasswordsMatching(false);
    if (pass.length > 0 && passCheck.length > 0) {
      setIsPasswordCorrect(true);
    } else {
      setIsPasswordCorrect(false);
    }
  }, [passCheck, pass]);

  return (
    <div className="register">
      <button
        type="button"
        onClick={showLogin}
        className="register__nav-button"
      >
        Вход
      </button>
      <form className="register-form" onSubmit={handleRegistration}>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={userNameChange}
        />

        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={userPassChange}
        />

        <label htmlFor="passwordCheck">Повторите пароль:</label>
        <input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          onChange={passCheckChange}
        />

        {!passwordsMatching && (
          <p className="error-message">Пароли не совпадают</p>
        )}
        {isPasswordCorrect ? null : (
          <p className="error-message">
            Пароли не могут быть меньше одного знака
          </p>
        )}

        <button type="submit">Регистрация</button>
      </form>
    </div>
  );
}

export default Registration;
