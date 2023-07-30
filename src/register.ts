import {
  confirmPasswordInput,
  emailInput,
  genericSubmitButton,
  nameInput,
  passwordInput,
} from "./inputs";
import { registerHandler } from "./main";

export const RegisterForm = document.createElement("form");
const registerButton = genericSubmitButton("Register");
const ErrorMessage = document.createElement("p");
ErrorMessage.style.color = "red";

RegisterForm.appendChild(emailInput.cloneNode(true));
RegisterForm.appendChild(passwordInput.cloneNode(true));
RegisterForm.appendChild(confirmPasswordInput);
RegisterForm.appendChild(nameInput);
RegisterForm.appendChild(ErrorMessage);
RegisterForm.appendChild(registerButton);

RegisterForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  console.log("Register form submitted");

  const formData = new FormData(event.target as HTMLFormElement);

  const validPassword =
    formData.get("password") === formData.get("confirmPassword");

  if (validPassword) {
    const { status, message } = registerHandler(
      String(formData.get("emailInput")),
      formData.get("password") as string,
      formData.get("nameInput") as string
    );
    if (status) {
      window.location.href = "/login";
    } else {
      ErrorMessage.textContent = message;
    }
  } else {
    ErrorMessage.textContent = "Password dont match";
  }
});
