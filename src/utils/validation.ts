import * as Yup from "yup";

export const singInSchema = Yup.object().shape({
  userName: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
  // .min(8, "رمز عبور حداقل باید شامل 8 کاراکتر باشد"),
});
