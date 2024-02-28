import "./Login.css";
import axios from "axios";

async function checkLogin(
  username,
  pass,
  setLogined,
  setShowLoginMenu,
  setShowRegisterMenu
) {
  try {
    console.log(username, pass);

    const apiEndpoint = `https://rowan-jumbled-willow.glitch.me/login`;

    const response = await axios.post(apiEndpoint, {
      name: username,
      pass: pass,
    });

    console.log(response);

    if (response.data.message === "Login successful") {
      setShowLoginMenu(false);
      setShowRegisterMenu(false);
      return setLogined(true);
    } else if (response.data.error === "Invalid credentials") {
      console.error("Неверные учетные данные");
      return { error: "Неверные учетные данные" };
    } else {
      console.error("Некорректный ответ от сервера", response.data);
      return { error: "Некорректный ответ от сервера" };
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error.message);
    return { error: error.message };
  }
}

function Login({
  setLogined,
  setPlayer,
  setPlayerPass,
  player,
  pass,
  setShowLoginMenu,
  setShowRegisterMenu,
}) {
  async function verification(e) {
    e.preventDefault();
    await checkLogin(
      player,
      pass,
      setLogined,
      setShowLoginMenu,
      setShowRegisterMenu
    );
  }

  function userNameChange(e) {
    e.preventDefault();
    setPlayer(e.target.value);
  }

  function userPassChange(e) {
    e.preventDefault();
    setPlayerPass(e.target.value);
  }
  function showRegister(e) {
    e.preventDefault();
    setShowLoginMenu(false);
    setShowRegisterMenu(true);
  }

  return (
    <div className="login">
      <button
        type="button"
        onClick={showRegister}
        className="login__nav-button"
      >
        Регистрация
      </button>
      <form className="login-form" onSubmit={verification}>
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

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
