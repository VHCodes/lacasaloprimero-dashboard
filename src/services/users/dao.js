import axios from "axios";

let source;

export const cancel = () => {
  source.cancel();
};

export const getUsers = async (limit = 0, offset = 0) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users?limit=${limit}&offset=${offset - 1}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const users = res.data.data.users;
      const usersCount = res.data.data.count;

      return { message: "success", users, count: usersCount };
    } else {
      return { message: "error" };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};

export const getUser = async (id) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const user = res.data.data.user;

      if (user) {
        return { message: "success", user };
      } else {
        return { message: "error" };
      }
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};

export const updateUser = async (id, isAdmin) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${id}`, { isAdmin });

    if (res.data.message === "success") {
      const user = res.data.data.user;

      if (user) {
        return { message: "success", user };
      } else {
        return { message: "error" };
      }
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};

export const deleteUser = async (id) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);

    if (res.data.message === "success") {
      const user = res.data.data.user;

      if (user) {
        return { message: "success", user };
      } else {
        return { message: "error" };
      }
    } else {
      return { message: "error" };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};
