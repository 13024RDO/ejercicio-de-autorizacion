export const validateSession = async () => {
  try {
    const response = await fetch("http://localhost:3000/auth/session", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return { user: data.user };
    } else {
      return { user: null };
    }
  } catch (error) {
    console.error("session error:", error);
    return { isValid: false, user: null, error: error.message };
  }
};
