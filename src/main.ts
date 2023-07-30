// import "./style.css";
import { LoginForm } from "./login";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import db from "./data.json";

// Define Global Variables and Functions
export type User = {
  email: string;
  password: string;
  name: string;
};

// TODO: Fix State should be on localStorage
export type AppStateType = {
  currentUser: User | undefined;
  logIn: (user: User) => void;
  getUser: () => User | undefined;
  logOut: () => void;
};

export const AppState: AppStateType = {
  currentUser: undefined,
  logIn(newUser: User) {
    this.currentUser = newUser;
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  },
  getUser() {
    const local = JSON.parse(localStorage.getItem("currentUser") ?? "") as User;
    this.currentUser = local !== null ? local : undefined;
    return this.currentUser;
  },
  logOut: () => {
    localStorage.removeItem("currentUser");
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
  },
};

export type GenericMessage = {
  status: boolean;
  message: string;
};

const UsersDB: User[] = db.map((user) => user as User);

console.log(UsersDB);

export const LOCATION = location.pathname;
export const Location = location;
export const Document = document;
export const App = Document.querySelector<HTMLDivElement>("#app");

const Navigation = Document.createElement("div");

export const Links = `
      <a href="/">Home</a>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      <a href="/about">About</a>
      <a href="/error">Error</a>
`;
Navigation!.className = "navbar";
Navigation!.innerHTML = `
    <div>
        ${Links}
    </div>
`;

const Home = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
        ${Links}
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const About = `
    <h1> About </h1>
    <div class="card">
    <div class="card">
        ${Links}
    </div>
    </div>
`;

const Error = `
      <a href="/">Go Home</a>
`;

const ErrorElement = document.createElement("div");
const ErrorH1 = document.createElement("h1");
ErrorH1.innerHTML = `Page not found`;
const ErrorLinks = document.createElement("div");
ErrorLinks.className = "card";
ErrorLinks.innerHTML = Error;
ErrorElement.appendChild(ErrorH1);
ErrorElement.appendChild(ErrorLinks);

const renderInnerHtml = (element: string) => {
  App!.innerHTML = element;
};

const renderElement = (element: HTMLElement) => {
  App!.appendChild(Navigation);
  App!.appendChild(element);
};

const replaceElement = (element: HTMLElement) => {
  App!.replaceWith(element);
};

const LoginPage = Document.createElement("div");
LoginPage.className = "loginPage";
LoginPage.appendChild(LoginForm);
const RegisterLink = Document.createElement("p");
RegisterLink.innerHTML = `
<h4>Don't have an account? <a href="/register">Register</a> here! </h4>
`;
LoginPage.appendChild(RegisterLink);

const RegisterPage = Document.createElement("div");

export const loginHandler = (
  email: string,
  password: string
): GenericMessage => {
  if (!checkEmail(email)) {
    return { status: false, message: "Invalid Credentials" };
  } else {
    const user = UsersDB.find((user) => user.email === email) as User;
    if (user!.password === password) {
      AppState.logIn(user);
      return { status: true, message: "Logged in successfully" };
    } else {
      return { status: false, message: "Password Incorrect" };
    }
  }
};

export const registerHandler = (
  email: string,
  password: string,
  name: string
): GenericMessage => {
  console.log(email, password, name);
  return { status: false, message: "Email Already Exists" };
};

const checkEmail = (email: string): boolean => {
  return UsersDB.find((user) => user.email === email) ? true : false;
};
const bootstrap = () => {
  if (JSON.parse(localStorage.getItem("isLoggedIn") ?? "false")) {
    const Dashboard = Document.createElement("div");
    const WelcomeMessage = Document.createElement("div");
    const LogOutButton = Document.createElement("button");
    LogOutButton.textContent = "Log Out";
    LogOutButton.addEventListener("click", () => {
      AppState.logOut();
      window.location.href = "/";
    });
    WelcomeMessage.innerHTML = `
      <h1>Welcome ${AppState.currentUser?.name}</h1>
    `;
    Dashboard.appendChild(WelcomeMessage);
    Dashboard.appendChild(LogOutButton);
    renderElement(Dashboard);
  } else {
    if (LOCATION === "/") {
      renderInnerHtml(Home);
    } else if (LOCATION === "/login") {
      replaceElement(LoginPage);
    } else if (LOCATION == "/register") {
      replaceElement(RegisterPage);
    } else if (LOCATION == "/about") {
      renderInnerHtml(About);
    } else {
      renderElement(ErrorElement);
    }
  }
};

bootstrap();
