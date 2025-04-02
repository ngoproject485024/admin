import instance from "../utils/instance";

export const getEducations = async () => {
  try {
    const { data } = await instance.get("/events-educations/education/all");

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

interface EducationValues {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  peDescription: string;
  enDescription: string;
  ruDescription: string;
  peEducationBody: string;
  enEducationBody: string;
  ruEducationBody: string;
  pePictures: [];
  enPictures: [];
  ruPictures: [];
  peVideo: [];
  enVideo: [];
  ruVideo: [];
}

export const createEducation = async (values: EducationValues) => {
  try {
    const { data } = await instance.post(
      "/events-educations/education/create",
      values
    );

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteEducation = async (id : string) => {
  try {
    const { data } = await instance.post(
      `/events-educations/education/delete/${id}`
    );

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
