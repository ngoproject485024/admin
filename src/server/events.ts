import instance from "../utils/instance";

export const getEvents = async () => {
  try {
    const { data } = await instance.get("events-educations/event/all");

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);
    return false;
  }
};

interface EventValues {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  peDescription: string;
  enDescription: string;
  ruDescription: string;
  peEventsBody: string;
  enEventsBody: string;
  ruEventsBody: string;
  pePictures: [];
  enPictures: [];
  ruPictures: [];
  peVideo: [];
  enVideo: [];
  ruVideo: [];
}

export const createEvent = async (values: EventValues) => {
  try {
    const { data } = await instance.post(
      "events-educations/event/create",
      values
    );

    return data;
  } catch (err) {
    console.error("Error fetching events:", err);
    return false;
  }
};
