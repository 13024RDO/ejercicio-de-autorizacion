import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/api.js";

export const todosPage = () => {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "min-h-screen",
    "bg-gradient-to-r",
    "from-purple-100",
    "to-blue-100",
    "p-6",
    "space-y-6"
  );

  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-teal-500",
    "text-white",
    "p-3",
    "rounded-lg",
    "shadow-md",
    "transition",
    "transform",
    "hover:bg-teal-600",
    "hover:scale-105",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-teal-300"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add(
    "text-4xl",
    "font-extrabold",
    "text-black-700",
    "hover:text-teal-800"
  );
  title.textContent = "New Tasks";

  const form = document.createElement("form");
  form.classList.add("bg-white", "p-6", "rounded-lg", "shadow-lg", "space-y-4");
  form.innerHTML = `
    <input type="hidden" name="id">
    <div class="space-y-2">
      <label for="title" class="block text-md font-semibold text-gray-800">Title</label>
      <input type="text" id="title" name="title" required class="w-full rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 px-3 py-2 transition">
    </div>
    <div class="space-y-2">
      <label for="completed" class="block text-md font-semibold text-gray-800">Completed</label>
      <input type="checkbox" id="completed" name="completed" class="rounded border-gray-300 text-teal-500 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition">
    </div>
    <button type="submit" class="bg-teal-600 text-white p-3 rounded-lg shadow-md transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300">Save Todo</button>
  `;

  const tableContainer = document.createElement("div");
  tableContainer.classList.add(
    "w-full",
    "overflow-x-auto",
    "bg-white",
    "shadow-lg",
    "rounded-lg"
  );

  const table = document.createElement("table");
  table.classList.add("min-w-full", "divide-y", "divide-gray-300");

  const thead = document.createElement("thead");
  thead.classList.add("bg-gray-50");

  const headerRow = document.createElement("tr");
  ["ID", "Title", "Completed", "Owner ID", "Actions"].forEach((text) => {
    const th = document.createElement("th");
    th.classList.add(
      "px-6",
      "py-4",
      "text-left",
      "text-xs",
      "font-medium",
      "text-gray-600",
      "uppercase",
      "tracking-wider"
    );
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.classList.add("bg-white", "divide-y", "divide-gray-300");
  table.appendChild(tbody);

  tableContainer.appendChild(table);

  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(form);
  container.appendChild(tableContainer);

  const renderTodos = async () => {
    try {
      const data = await getTodos();
      tbody.innerHTML = "";
      data.todos.forEach((todo) => {
        if (todo.id === 0) return;

        const tr = document.createElement("tr");

        const createTd = (content) => {
          const td = document.createElement("td");
          td.classList.add("px-6", "py-4", "whitespace-nowrap");
          td.textContent = content;
          return td;
        };

        tr.appendChild(createTd(todo.id));
        tr.appendChild(createTd(todo.title));
        tr.appendChild(createTd(todo.completed ? "Yes" : "No"));
        tr.appendChild(createTd(todo.owner));

        const actionsTd = document.createElement("td");
        actionsTd.classList.add("px-6", "py-4", "whitespace-nowrap");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add(
          "bg-blue-500",
          "text-white",
          "p-2",
          "rounded-lg",
          "shadow-md",
          "mr-2",
          "transition",
          "transform",
          "hover:bg-yellow-600",
          "hover:scale-105",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-yellow-300"
        );
        editButton.addEventListener("click", () => {
          form.id.value = todo.id;
          form.title.value = todo.title;
          form.completed.checked = todo.completed;
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add(
          "bg-red-500",
          "text-white",
          "p-2",
          "rounded-lg",
          "shadow-md",
          "transition",
          "transform",
          "hover:bg-red-600",
          "hover:scale-105",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-red-300"
        );
        deleteButton.addEventListener("click", async () => {
          if (confirm("Are you sure you want to delete this todo?")) {
            try {
              await deleteTodo(todo.id);
              renderTodos();
            } catch (error) {
              console.error("Error deleting todo:", error);
            }
          }
        });

        actionsTd.appendChild(editButton);
        actionsTd.appendChild(deleteButton);
        tr.appendChild(actionsTd);

        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const todo = {
      title: formData.get("title"),
      completed: formData.get("completed") === "on",
    };

    try {
      if (formData.get("id")) {
        await updateTodo(formData.get("id"), todo);
      }

      await createTodo(todo);

      e.target.reset();
      renderTodos();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  });

  renderTodos();

  return container;
};
