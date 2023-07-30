// import "./style.css";
import { LoginForm } from "./login";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import db from "./data.json";
import { RegisterForm } from "./register";
import { headingBuilder } from "./GenericHeaders";

export const BASE =
  process.env.NODE_ENV === "production" ? "/authvanilla/" : "/";

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
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    const current = JSON.parse(
      localStorage.getItem("currentUser") ?? ""
    ) as User;
    this.currentUser = current;
  },
  getUser() {
    const local = JSON.parse(localStorage.getItem("currentUser") ?? "") as User;
    this.currentUser = local !== null ? local : undefined;
    return this.currentUser;
  },
  logOut: () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("Users");
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
      <a href="${BASE}">Home</a>
      <a href="${BASE}login/">Login</a>
      <a href="${BASE}register/">Register</a>
      <a href="${BASE}about/">About</a>
      <a href="${BASE}error/">Error</a>
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
      <a href="${BASE}">Go Home</a>
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
LoginForm.appendChild(headingBuilder("Login", "1"));
LoginPage.appendChild(LoginForm);
const RegisterLink = Document.createElement("p");
RegisterLink.innerHTML = `
<h4>Don't have an account? <a href="${BASE}register/">Register</a> here! </h4>
`;
LoginPage.appendChild(RegisterLink);

const RegisterPage = Document.createElement("div");
RegisterPage.appendChild(headingBuilder("Register", "1"));
RegisterPage.appendChild(RegisterForm);

export const loginHandler = (
  email: string,
  password: string
): GenericMessage => {
  if (!checkEmail(email)) {
    return { status: false, message: "Invalid Credentials" };
  } else {
    const currentUsers = JSON.parse(
      localStorage.getItem("Users") ?? ""
    ) as User[];
    const user = currentUsers.find((user) => user.email === email) as User;
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
  if (!checkEmail(email)) {
    UsersDB.push({ email, password, name });
    localStorage.setItem("Users", JSON.stringify(UsersDB));
    return { status: true, message: "Registered successfully" };
  } else {
    return { status: false, message: "Email Already Exists" };
  }
};

const checkEmail = (email: string): boolean => {
  const currentUsers = JSON.parse(
    localStorage.getItem("Users") ?? ""
  ) as User[];
  return currentUsers.find((user) => user.email === email) ? true : false;
};
const bootstrap = () => {
  if (localStorage.getItem("Users") === null) {
    localStorage.setItem("Users", JSON.stringify(UsersDB));
    console.log(localStorage.getItem("Users"));
  }

  // TODO: Needs Refactoring
  if (JSON.parse(localStorage.getItem("isLoggedIn") ?? "false")) {
    // BUG: Bug when state is always true, kept refreshing.
    // FIX: Try different approach
    // window.location.href = "/dashboard";
    const Dashboard = Document.createElement("div");
    const WelcomeMessage = Document.createElement("div");
    const LogOutButton = Document.createElement("button");
    LogOutButton.textContent = "Log Out";
    LogOutButton.addEventListener("click", () => {
      AppState.logOut();
      window.location.href = `${BASE}`;
    });

    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "");

    WelcomeMessage.innerHTML = `
      <h1>Welcome ${currentUser.name}</h1>
    `;
    Dashboard.appendChild(WelcomeMessage);
    Dashboard.appendChild(LogOutButton);
    renderElement(Dashboard);
  } else {
    if (LOCATION === `${BASE}`) {
      renderInnerHtml(Home);
    } else if (LOCATION === `${BASE}login/`) {
      replaceElement(LoginPage);
    } else if (LOCATION == `${BASE}register/`) {
      replaceElement(RegisterPage);
    } else if (LOCATION == `${BASE}about/`) {
      renderInnerHtml(About);
    } else {
      renderElement(ErrorElement);
    }
  }
};

bootstrap();
