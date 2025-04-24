import instance from "../utils/instance";

export const getNgos = async () => {
  try {
    const { data } = await instance.get("ngo/admin/ngo");

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);

    return false;
  }
};

export const enableAndDisableNgo = async (id: string) => {
  try {
    const { data } = await instance.put(`ngo/disable/${id}`);

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);

    return false;
  }
};

export const getSpecificNgo = async (id: string) => {
  try {
    const { data } = await instance.get(`ngo/admin/ngo/${id}`);

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);

    return false;
  }
};

export const getNgoDocuments = async () => {
  try {
    const { data } = await instance.get(`/ngo/admin/documents`);

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);

    return false;
  }
};
export const changeStatusDoc = async (id: string, state: number) => {
  try {
    const { data } = await instance.put(
      `/ngo/document/approve/${id}?state=${state}`
    );

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);

    return false;
  }
};
