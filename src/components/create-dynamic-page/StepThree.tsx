import TemplateOne from "./TemplateOne";

function StepThree({
  formik,
  contentFormik,
  formikTemplateSubContent,
  formikTemplateSecondPage,
  onStep,
  onFile,
  isLoading,
  step,
}: {
  formik: any;
  contentFormik: any;
  formikTemplateSubContent: any;
  formikTemplateSecondPage: any;
  onStep: (step: number) => void;
  onFile: (image: File[]) => void;
  isLoading: boolean;
  step: number;
}) {
  return (
    <>
      {formik.values.template === 1 && (
        <TemplateOne
          formik={formik}
          contentFormik={contentFormik}
          formikTemplateSubContent={formikTemplateSubContent}
          formikTemplateSecondPage={formikTemplateSecondPage}
          onStep={onStep}
          onFile={onFile}
          isLoading={isLoading}
          step={step}
        />
      )}
    </>
  );
}

export default StepThree;
