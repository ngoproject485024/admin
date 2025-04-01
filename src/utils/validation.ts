import * as Yup from "yup";

export const singInSchema = Yup.object().shape({
  userName: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
  // .min(8, "رمز عبور حداقل باید شامل 8 کاراکتر باشد"),
});

export const educationSchema = Yup.object().shape({
  peTitle: Yup.string().required("عنوان فارسی الزامی است"),
  enTitle: Yup.string().required("عنوان انگلیسی الزامی است"),
  ruTitle: Yup.string().required("عنوان روسی الزامی است"),
  peDescription: Yup.string().required("توضیحات فارسی الزامی است"),
  enDescription: Yup.string().required("توضیحات انگلیسی الزامی است"),
  ruDescription: Yup.string().required("توضیحات روسی الزامی است"),
  peEducationBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی فارسی الزامی است"),
  enEducationBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی انگلیسی الزامی است"),
  ruEducationBody: Yup.string()
    .min(150, "توضیحات تکمیلی نباید کوتاه در از 200 کاراکتر باشد")
    .required(" توضیحات تکلمیلی روسی الزامی است"),
});
