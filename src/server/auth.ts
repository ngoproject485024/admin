import instance from "../utils/instance";

export const loginRequest = async (value: {
  userName: string;
  password: string;
}) => {
  try {
    const { data } = await instance.post("/admin/login", value);

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
