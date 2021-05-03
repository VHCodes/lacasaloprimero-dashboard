import axios from "axios";

let source;

export const cancel = () => {
  source.cancel();
};

export const createCategory = async (name) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/categories`,
      { name },
      { cancelToken: source.token }
    );

    if (res.data.message === "success") {
      const category = res.data.data.category;

      if (category) {
        return { message: "success", category };
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

export const getCategories = async (limit = 0, offset = 0) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories?limit=${limit}&offset=${offset - 1}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const categories = res.data.data.categories;
      const categoriesCount = res.data.data.count;

      return { message: "success", categories, count: categoriesCount };
    } else {
      return { message: "error" };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};

export const getCategory = async (id) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const category = res.data.data.category;

      if (category) {
        return { message: "success", category };
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

export const updateCategory = async (id, name) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/categories/${id}`,
      { name },
      { cancelToken: source.token }
    );

    if (res.data.message === "success") {
      const category = res.data.data.category;

      if (category) {
        return { message: "success", category };
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

export const deleteCategory = async (id) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/categories/${id}`, { cancelToken: source.token });

    if (res.data.message === "success") {
      const category = res.data.data.category;

      if (category) {
        return { message: "success", category };
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
