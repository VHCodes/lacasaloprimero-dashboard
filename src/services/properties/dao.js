import axios from "axios";

let source;

export const cancel = () => {
  source.cancel();
};

export const createProperty = async (formFata, setProgress) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/properties`, formFata, {
      onUploadProgress: (progressEvent) => {
        setProgress(progressEvent.loaded / progressEvent.total);
      },
    });

    if (res.data.message === "success") {
      const property = res.data.data.property;

      if (property) {
        return { message: "success", property };
      } else {
        return { message: "error" };
      }
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};

export const getProperties = async (limit = 0, offset = 0) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties?limit=${limit}&offset=${offset - 1}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const properties = res.data.data.properties;
      const propertiesCount = res.data.data.count;

      return { message: "success", properties, count: propertiesCount };
    } else {
      return { message: "error" };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};

export const getProperty = async (id) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties/${id}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const property = res.data.data.property;

      if (property) {
        return { message: "success", property };
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

export const updateProperty = async (id, formFata, setProgress) => {
  try {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/properties/${id}`, formFata, {
      onUploadProgress: (progressEvent) => {
        setProgress(progressEvent.loaded / progressEvent.total);
      },
    });

    if (res.data.message === "success") {
      const property = res.data.data.property;

      return { message: "success", property };
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    return { message: "serverError" };
  }
};

export const deleteProperty = async (id) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/properties/${id}`);

    if (res.data.message === "success") {
      const property = res.data.data.property;
      if (property) {
        return { message: "success", property };
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
