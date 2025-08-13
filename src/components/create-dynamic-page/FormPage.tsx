import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import useTemplateOne from "../../hooks/useTemplateOne";
import useCreatePage from "../../hooks/useCreatePage";
import useTemplateThree from "../../hooks/useTemplteThree";

function FormPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<File[]>([]);
  const [subImage, setSubImage] = useState<File[]>([]);
  const [secondImage, setSecondImage] = useState<File[]>([]);
  const [step, setStep] = useState(1);

  const handleSetImage = (image: File[]) => {
    setImage(image);
  };

  const handleSetSubImage = (image: File[]) => {
    setSubImage(image);
  };

  const handleSetSecondImage = (image: File[]) => {
    setSecondImage(image);
  };

  const handleSetStep = (step: number) => {
    setStep(step);
  };

  const handleStopLoading = () => setIsLoading(false);
  const handleStartLoading = () => setIsLoading(true);

  const {
    formikTemplateOne,
    formikTemplateSubContent,
    formikTemplateSecondPage,
  } = useTemplateOne();

  const { formikTemplateThreePage } = useTemplateThree();

  const { createFormik } = useCreatePage(
    handleStartLoading,
    handleStopLoading,
    image,
    subImage,
    secondImage,
    formikTemplateOne,
    formikTemplateSubContent,
    formikTemplateSecondPage
  );

  return (
    <>
      <form onSubmit={createFormik.handleSubmit}>
        {/* //? عنوان و مسیر صفحه */}
        {step === 1 && <StepOne formik={createFormik} onStep={handleSetStep} />}
        {/* //? قالب صفحه */}
        {step === 2 && (
          <StepTwo formik={createFormik} onStep={handleSetStep} step={step} />
        )}
        {/* //? محتوای صفحه */}
        {step === 3 && (
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
        )}
        {/* //? قالب صفحه فرعی */}
        {step === 4 && (
          <StepTwo formik={createFormik} onStep={handleSetStep} step={step} />
        )}
        {/* //? محتوای صفحه فرعی */}
        {step === 5 && (
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
        )}
        {/* //? قالب صفحه فرعی دوم*/}
        {step === 6 && (
          <StepTwo formik={createFormik} onStep={handleSetStep} step={step} />
        )}

        {/* //? محتوای صفحه فرعی */}
        {step === 7 && (
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
        )}
      </form>
    </>
  );
}

export default FormPage;
