export const homePage = () => {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200",
    "flex-col",
    "gap-4"
  );

  const title = document.createElement("h1");
  title.classList.add("text-2xl", "font-bold", "mb-4");
  title.textContent = "Home Page";

  const welcomeMessage = document.createElement("p");
  welcomeMessage.classList.add("text-lg", "mb-4");
  welcomeMessage.textContent = "Welcome, User!";

  const btnLogout = document.createElement("button");
  btnLogout.classList.add(
    "bg-red-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-red-600"
  );
  btnLogout.textContent = "Logout";

  btnLogout.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/sign-out", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.pathname = "/";
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });

  const btnTodos = document.createElement("button");
  btnTodos.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600"
  );
  btnTodos.textContent = "View todos";

  btnTodos.addEventListener("click", () => {
    window.location.pathname = "/todos";
  });

  container.appendChild(title);
  container.appendChild(welcomeMessage);
  container.appendChild(btnTodos);
  container.appendChild(btnLogout);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/session", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        welcomeMessage.textContent = `Welcome, ${data.user.username}!`;
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  fetchUserData();

  return container;
};
