import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";

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
      {step === 3 && (
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
          {formik.values.template === 2 && (
            <TemplateTwo
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
      )}
      {step === 5 && (
        <>
          {formik.values.subPage.template === 1 && (
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
          {formik.values.subPage.template === 2 && (
            <TemplateTwo
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
      )}
      {step === 7 && (
        <>
          {formik.values.secondSubPage.template === 1 && (
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
          {formik.values.secondSubPage.template === 2 && (
            <TemplateTwo
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
      )}
    </>
  );
}

export default StepThree;
