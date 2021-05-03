import axios from "axios";

let source;

export const cancel = () => {
  source.cancel();
};

export const uploadPhoto = async (formFata, setProgress) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/photos`, formFata, {
      onUploadProgress: (progressEvent) => {
        setProgress(progressEvent.loaded / progressEvent.total);
      },
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const photo = res.data.data.photo;

      return { message: "success", photo };
    } else {
      return { message: "errors", errors: res.data.errors };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};

export const getPhotos = async (limit = 0, offset = 0) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/photos?limit=${limit}&offset=${offset - 1}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const photos = res.data.data.photos;
      const photosCount = res.data.data.count;

      return { message: "success", photos, count: photosCount };
    } else {
      return { message: "error" };
    }
  } catch (error) {
    if (!axios.isCancel(error)) return { message: "serverError" };
  }
};

export const getPhoto = async (id) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const photo = res.data.data.photo;

      if (photo) {
        return { message: "success", photo };
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

export const deletePhoto = async (id) => {
  source = axios.CancelToken.source();

  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
      cancelToken: source.token,
    });

    if (res.data.message === "success") {
      const photo = res.data.data.photo;

      if (photo) {
        return { message: "success", photo };
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
