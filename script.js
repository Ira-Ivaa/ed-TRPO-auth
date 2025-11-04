const welcomeScreen = document.getElementById("welcome-screen");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const content = document.getElementById("protected-content");

const inputName = document.getElementById("reg-username");
const inputPass = document.getElementById("reg-password");
const loginName = document.getElementById("login-username");
const loginPass = document.getElementById("login-password");

const userName = document.getElementById("username");
const postsList = document.getElementById("posts-list");

// Показать разные экраны
function showWelcome() {}

function showRegister() {}

function showLogin() {}

function hideAll() {}

// Получить пользователей
function getUsers() {}

// Сохранить пользователей
function saveUsers(users) {}

// Генерация токена (имитация JWT)
function generateToken(username) {}

// Регистрация нового пользователя
function register() {}

// Вход пользователя
function login() {}

// Выход из аккаунта
function logout() {}

// Показать защищённый контент
async function showProtectedContent() {
  // Имитация защищённого API
  try {
  } catch (err) {
    console.error("Ошибка загрузки:", err);
    alert("Не удалось загрузить данные");
  }
}

// При загрузке страницы
window.onload = () => {
  if (localStorage.getItem("token") && localStorage.getItem("currentUser")) {
    showProtectedContent();
  } else {
    showWelcome();
  }
};
