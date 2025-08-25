// import { useState } from "react";
import { useFormik } from "formik";
import StepOne from "./StepOne";
import FormPageType from "../../types/form-page-type";
import { useState } from "react";
import StepTwo from "./StepTwo";
import { uploadFiles } from "../../server/uploadFiles";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createPage } from "../../server/dynamic-page";
import { useNavigate } from "react-router";
// import StepTwo from "./StepTwo";
// import StepThree from "./StepThree";
// import useTemplateOne from "../../hooks/useTemplateOne";
// import useCreatePage from "../../hooks/useCreatePage";
// import useTemplateThree from "../../hooks/useTemplteThree";

function FormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["createPage"],
    mutationFn: createPage,
    onSuccess: (response: any) => {
      console.log(response);
      if (response?.success) {
        toast.success("صفحه با موفقیت ایجاد شد");
        navigate("/dynamic-pages");
      } else {
        toast.error(response?.error || "خطا در ایجاد صفحه");
      }
    },
  });

  const handleSetStep = (step: number) => {
    setStep(step);
  };

  const formik = useFormik<FormPageType>({
    initialValues: {
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      path: "",
      hasSubPage: false,
      hasSecondSubPage: false,
      peContent: [],
      enContent: [],
      ruContent: [],
    },
    onSubmit: async (values: FormPageType) => {
      if (Object.keys(values?.peContent).length > 0) {
        setIsLoading(true);
        for (let i = 0; i < values.peContent.length; i++) {
          const item = values.peContent[i];
          if (item.title === "images") {
            const formData = new FormData();
            for (let j = 0; j < item.content.length; j++) {
              formData.append("picture", item.content[j]);
            }
            const res = await uploadFiles(formData);
            setIsLoading(false);

            if (res?.success) {
              values.peContent[i].content = res?.data;
              values.enContent[i].content = res?.data;
              values.ruContent[i].content = res?.data;
            } else {
              toast.error(res?.error);
              return;
            }
          }
        }

        setIsLoading(false);
        mutation.mutate(values);
      } else {
        toast.error("لطفا محتوای صفحه را وارد کنید");
        setIsLoading(false);
        return;
      }
    },
  });

  return (
    <>
      Step {step}
      <form onSubmit={formik.handleSubmit}>
        {/* //? عنوان و مسیر صفحه */}
        {step === 1 && <StepOne formik={formik} onStep={handleSetStep} />}
        {/* //? قالب صفحه */}
        {step === 2 && (
          <StepTwo
            formik={formik}
            onStep={handleSetStep}
            step={step}
            isLoading={isLoading}
          />
        )}
        {step === 3 && (
          <StepTwo
            formik={formik}
            onStep={handleSetStep}
            step={step}
            isLoading={isLoading}
          />
        )}

        {/* //? محتوای صفحه */}
        {/* {step === 3 && (
          <StepThree
            formik={createFormik}
            contentFormik={formikTemplateOne}
            formikTemplateSubContent={formikTemplateSubContent}
            formikTemplateSecondPage={formikTemplateSecondPage}
            formikTemplateThreePage={formikTemplateThreePage}
            onStep={handleSetStep}
            onFile={handleSetImage}
            isLoading={isLoading}
            step={step}
          />
        )} */}
        {/* //? قالب صفحه فرعی */}
        {/* {step === 4 && (
          <StepTwo formik={createFormik} onStep={handleSetStep} step={step} />
        )} */}
        {/* //? محتوای صفحه فرعی */}
        {/* {step === 5 && (
          <StepThree
            formik={createFormik}
            contentFormik={formikTemplateOne}
            formikTemplateSubContent={formikTemplateSubContent}
            formikTemplateSecondPage={formikTemplateSecondPage}
            onStep={handleSetStep}
            onFile={handleSetSubImage}
            isLoading={isLoading}
            step={step}
          />
        )} */}
        {/* //? قالب صفحه فرعی دوم*/}
        {/* {step === 6 && (
          <StepTwo formik={createFormik} onStep={handleSetStep} step={step} />
        )} */}
        {/* //? محتوای صفحه فرعی */}
        {/* {step === 7 && (
          <StepThree
            formik={createFormik}
            contentFormik={formikTemplateOne}
            formikTemplateSubContent={formikTemplateSubContent}
            formikTemplateSecondPage={formikTemplateSecondPage}
            onStep={handleSetStep}
            onFile={handleSetSecondImage}
            isLoading={isLoading}
            step={step}
          />
        )} */}
      </form>
    </>
  );
}

export default FormPage;
