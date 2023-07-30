import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";

// Define Global Variables and Functions
export type User = {
  email: string;
  password: string;
  name: string;
};

export type AppStateType = {
  currentUser: User | undefined;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  getUser: () => User | undefined;
};

export const AppState: AppStateType = {
  currentUser: undefined,
  isLoggedIn: false,
  setUser(newUser: User) {
    this.currentUser = newUser;
  },
  getUser() {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      return undefined;
    }
  },
};

export type CurrentUser = {
  user: User;
  setCurrent: (user: User) => {};
  getUser: User;
};

export const LOCATION = location.pathname;
export const Location = location;
export const Document = document;
export const App = document.querySelector<HTMLDivElement>("#app");

export const Links = `
      <a href="/">Home</a>
      <a href="/login">Login</a>
      <a href="/register">Register</a>
      <a href="/about">About</a>
      <a href="/error">Error</a>
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

const Login = `
    <h1> Login </h1>
    <div class="card">
    <div class="card">
        ${Links}
    </div>
    </div>
`;
const Register = `
    <h1> Register </h1>
    <div class="card">
    <div class="card">
        ${Links}
    </div>
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
  App!.appendChild(element);
};

const bootstrap = () => {
  if (AppState.isLoggedIn) {
    const Dashboard = Document.createElement("div");
    const WelcomeMessage = Document.createElement("div");
    WelcomeMessage.innerHTML = `
      <h1>Welcome</h1>
    `;

    Dashboard.appendChild(WelcomeMessage);
  } else {
    if (LOCATION === "/") {
      renderInnerHtml(Home);
    } else if (LOCATION === "/login") {
      renderInnerHtml(Login);
    } else if (LOCATION == "/register") {
      renderInnerHtml(Register);
    } else if (LOCATION == "/about") {
      renderInnerHtml(About);
    } else {
      renderElement(ErrorElement);
    }
  }
};

bootstrap();
