// Input builder
export const inputBuilder = (props: {
  type?: "text" | "number" | "email" | "password";
  name?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}): HTMLInputElement => {
  const input = document.createElement("input");
  input.type = props.type ?? "text";
  input.name = props.name ?? "defaultInput";
  input.placeholder = props.placeholder ?? "No Placeholder provided";
  input.minLength = props.min ?? 1;
  input.maxLength = props.max ?? 64;
  return input;
};

export const emailInput = inputBuilder({
  type: "email",
  name: "emailInput",
  placeholder: "q@q.com",
});

export const passwordInput = inputBuilder({
  type: "password",
  name: "password",
  placeholder: "Secret Password",
  min: 3,
  max: 32,
});

export const nameInput = inputBuilder({
  type: "text",
  name: "nameInput",
  placeholder: "Jose Rizal",
  min: 2,
});

export const confirmPasswordInput = inputBuilder({
  type: "password",
  name: "confirmPassword",
  placeholder: "Confirm Secret Password",
  min: 3,
  max: 32,
});

export const genericSubmitButton = (text: string): HTMLButtonElement => {
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = text;
  return button;
};
