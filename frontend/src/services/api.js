const URL = "http://localhost:3000/todos";
export const getTodos = async () => {
  try {
    const response = await fetch(URL, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Falló get todos");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Falló create todo");
    }

    return response.json();
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

export const updateTodo = async (id, todo) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Falló update todo");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Falló delete todo");
    }
    return response.json();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
