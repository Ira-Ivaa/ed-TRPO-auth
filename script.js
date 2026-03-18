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
function showWelcome() {
    hideAll();
    welcomeScreen.style.display = "block";
}

function showRegister() {
    hideAll();
    registerForm.style.display = "block";
}

function showLogin() {
    hideAll();
    loginForm.style.display = "block";
}

function hideAll() {
    welcomeScreen.style.display = "none";
    registerForm.style.display = "none";
    loginForm.style.display = "none";
    content.style.display = "none";
}

// Получить пользователей
function getUsers() {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
}

// Сохранить пользователей
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Генерация токена (имитация JWT)
function generateToken(username) {
    return "jwt_" + btoa(username + Date.now());
}

// Регистрация нового пользователя
function register() {
    const username = inputName.value.trim();
    const password = inputPass.value.trim();

    if (!username || !password) {
        alert("Заполни все поля");
        return;
    }

    const users = getUsers();
    if (users.find((u) => u.username === username)) {
        alert("Этот логин уже используется");
        return;
    }

    users.push({ username, password });
    saveUsers(users);

    console.log("=== РЕГИСТРАЦИЯ ===");
    console.log("Новый пользователь:", { username });

    alert("Пользователь успешно зарегестрировался");
    showLogin();
}

// Вход пользователя
function login() {
    const username = loginName.value.trim();
    const password = loginPass.value.trim();

    if (!username || !password) {
        alert("Заполни все поля");
        return;
    }

    const users = getUsers();
    const user = users.find((u) => {
        console.log(u.username, u.password);
        return u.username === username && u.password === password;
    });

    if (!user) {
        alert("Неверный логин или пароль");
        console.warn("Попытка входа с ошибкой:", { username });
        return;
    }

    const token = generateToken(username);
    localStorage.setItem("token", token);
    localStorage.setItem("currentUser", username);

    console.log("=== АУТЕНТИФИКАЦИЯ УСПЕШНА ===");
    console.log("Токен:", token);

    showProtectedContent();
}

// Выход из аккаунта
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    showWelcome();
}

// Показать защищённый контент
async function showProtectedContent() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("currentUser");

    if (!token || !username) {
        alert("Доступ запрещен");
        showWelcome();
        return;
    }
    // Имитация защищённого API
    try {
        const postResponse = await fetch(
            "https://jsonplaceholder.typicode.com/posts?userId=1"
        );
        console.log("=== ЗАПРОС К API ===");
        console.log("Статус:", postResponse.status);

        const posts = await postResponse.json();

        userName.textContent = username;
        postsList.textContent - "";

        posts.slice(0, 5).forEach((post) => {
            const li = document.createElement("li");
            li.textContent = post.title;
            postsList.appendChild(li);
        });

        hideAll();
        content.style.display = "block";
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

// localStorage.clear();
