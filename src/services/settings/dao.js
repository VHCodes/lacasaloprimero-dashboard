import axios from "axios";

let source;

export const cancel = () => {
  source.cancel();
};

export const getSettings = async () => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/settings`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const settings = res.data.data.settings;

      return { message: "success", settings };
    } else {
      return { message: "error" };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};

export const updateSettings = async (values) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/settings/`, values);

    if (res.data.message === "success") {
      const settings = res.data.data.settings;

      if (settings) {
        return { message: "success", settings };
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
