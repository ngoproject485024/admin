import axios from "axios";

export const uploadFiles = async (valuse: FormData) => {
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_API_URL + "page/uploadFile",
      valuse,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
