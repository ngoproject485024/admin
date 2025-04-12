import instance from "../utils/instance";

export const homePage = async (values: any) => {
  try {
    const { data } = await instance.post("/page/home/create", values);

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getHomeData = async () => {
  try {
    const { data } = await instance.get("/page/home");

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const setCompletedProjects = async (values: any) => {
  try {
    const { data } = await instance.post(
      "/page/project/complete/create",
      values
    );

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCompletedProjects = async () => {
  try {
    const { data } = await instance.get("/page/project/complete");

    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
