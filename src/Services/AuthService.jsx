const url = "https://localhost:7179/api/";
class AuthService {
  static async CheckToken(token) {
    const response = await fetch(`${url}auth/checkToken/${token}`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }
  static async changePassword(token, password) {
    const response = await fetch(
      `${url}auth/ChangePassword/${token}/${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }
  static async sendPassword(email) {
    console.log(email);
    const response = await fetch(`${url}auth/ChangePassword/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }
  static async login(username, password) {
    console.log(username);
    console.log(password);
    try {
      const response = await fetch(`${url}Auth/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      throw new Error("Login failed");
    }
  }
}

export default AuthService;
