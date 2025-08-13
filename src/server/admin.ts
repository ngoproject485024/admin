import instance from "../utils/instance";

export const getAdmin = async () => {
  try {
    const { data } = await instance.get("/admin/all");

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};

export const createAdmin = async (values: any) => {
  try {
    const { data } = await instance.post("/admin/create", values);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};

export const updateAdmin = async (id: string, values: any) => {
  try {
    const { data } = await instance.post(`/admin/update/${id}`, values);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};
export const updateAdminAccess = async (id: string, values: any) => {
  try {
    const { data } = await instance.post(`/admin/access/update/${id}`, values);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    const { data } = await instance.post(`/admin/delete/${id}`);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};

export const getSingleAdmin = async (id: string) => {
  try {
    const { data } = await instance.get(`/admin/${id}`);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};

export const getAccessPoint = async (id: string) => {
  try {
    const { data } = await instance.get(`/admin/access/${id}`);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};

export const getUserLogs = async () => {
  try {
    const { data } = await instance.get(`/users/log/all`);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};

export const getAdminLogs = async () => {
  try {
    const { data } = await instance.get(`/admin/log/all`);

    return data;
  } catch (err: any) {
    console.error(err);

    return err?.response;
  }
};
