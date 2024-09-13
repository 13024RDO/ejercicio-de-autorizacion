export const loginPage = () => {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const form = document.createElement("form");
  form.classList.add(
    "flex",
    "flex-col",
    "w-1/6",
    "gap-4",
    "bg-white",
    "p-8",
    "rounded",
    "shadow-md"
  );

  const title = document.createElement("h2");
  title.classList.add("text-2xl", "font-bold", "mb-4");
  title.textContent = "Login form";

  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.id = "username";
  usernameInput.name = "username";
  usernameInput.required = true;
  usernameInput.classList.add(
    "w-full",
    "p-2",
    "border",
    "border-gray-300",
    "rounded"
  );
  usernameInput.placeholder = "Username";

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.required = true;
  passwordInput.name = "password";
  passwordInput.classList.add(
    "w-full",
    "p-2",
    "border",
    "border-gray-300",
    "rounded"
  );
  passwordInput.placeholder = "Password";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add(
    "w-full",
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded"
  );
  submitButton.textContent = "Login";

  const messageDiv = document.createElement("div");
  messageDiv.id = "message";
  messageDiv.classList.add("text-center", "mt-4");

  form.appendChild(title);
  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  form.appendChild(messageDiv);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
      messageDiv.innerText = "Por favor, completa todos los campos.";
      messageDiv.classList.add("bg-red-500", "text-white", "p-2", "rounded");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/sign-in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        messageDiv.innerText = "Credenciales inválidas";
        messageDiv.classList.add("bg-red-500", "text-white", "p-2", "rounded");

        setTimeout(() => {
          messageDiv.innerText = "";
          messageDiv.classList.remove(
            "bg-red-500",
            "text-white",
            "p-2",
            "rounded"
          );
        }, 3500);

        return;
      }

      const data = await response.json();
      console.log(data);
      window.location.pathname = "/home";
    } catch (error) {
      messageDiv.innerText = "Error al iniciar sesión. Inténtalo de nuevo.";
      messageDiv.classList.add("bg-red-500", "text-white", "p-2", "rounded");
    }
  });

  container.appendChild(form);

  return container;
};
