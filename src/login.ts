import { emailInput, genericSubmitButton, passwordInput } from "./inputs";
import { loginHandler } from "./main";

export const LoginForm = document.createElement("form");

LoginForm.className = "loginForm";

const ErrorMessage = document.createElement("p");
ErrorMessage.style.color = "red";

LoginForm.appendChild(emailInput);
LoginForm.appendChild(passwordInput);
LoginForm.appendChild(ErrorMessage);
LoginForm.appendChild(genericSubmitButton("Login"));

LoginForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  console.log("Login form submitted");
  const formData = new FormData(event.target as HTMLFormElement);

  const { status, message } = loginHandler(
    String(formData.get("emailInput")),
    formData.get("password") as string
  );
  if (status) {
    window.location.href = "/";
  } else {
    ErrorMessage.textContent = message;
  }
});
