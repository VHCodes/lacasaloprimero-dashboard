import axios from "axios";

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });

    if (res.data.message === "success") {
      const user = res.data.data.user;
      const token = res.data.data.token;

      return { message: "success", user, token };
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};

export const signup = async (username, email, password) => {
  try {
    const url = `${window.location.origin}/confirm/`;
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username, email, password, url });

    if (res.data.message === "success") {
      return { message: "success" };
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};

export const confirm = async (token) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/confirm?token=${token}`);

    if (res.data.message === "success") {
      return { message: "success" };
    } else {
      return { message: "errors" };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};

export const verify = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`);

    if (res.data.message === "success") {
      const user = res.data.data.user;

      if (user.isAdmin) {
        return { message: "success", user };
      } else {
        return { message: "error" };
      }
    } else {
      return { message: "error" };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};

export const updatePassword = async (password, newPassword) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/auth/update-password`, { password, newPassword });

    if (res.data.message === "success") {
      const user = res.data.data.user;

      return { message: "success", user };
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};

export const requestResetPassword = async (email) => {
  try {
    const url = `${window.location.origin}/reset-password/`;
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, { email, url });

    if (res.data.message === "success") {
      return { message: "success" };
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};

export const resetPassword = async (password, token) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/auth/reset-password`, { password, token });

    if (res.data.message === "success") {
      const user = res.data.data.user;
      const token = res.data.data.token;

      return { message: "success", token, user };
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};
