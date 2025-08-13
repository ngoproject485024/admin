import { FormikProps } from "formik";
import Button from "../ui/button/Button";
import TemplatePreviwe from "./TemplatePreview";
import TemplateSelector from "./TemplateSelector";

interface Props {
  formik: FormikProps<any>;
  onStep: (step: number) => void;
  step: number;
}

function StepTwo({ formik, onStep, step }: Props) {
  const handleSetTemplate = (template: number) => {
    if (step === 2) {
      formik.setFieldValue("template", template);
    } else if (step === 4) {
      formik.setFieldValue("subPage.template", template);
    } else if (step === 6) {
      formik.setFieldValue("secondSubPage.template", template);
    }
  };

  return (
    <>
      <TemplateSelector
        title={
          step === 2
            ? "قالب صفحه اصلی"
            : step === 4
            ? "قالب صفحه فرعی"
            : "قالب صفحه فرعی دوم"
        }
        template={
          step === 2
            ? formik.values.template
            : step === 4
            ? formik.values.subPage?.template
            : step === 6
            ? formik.values.secondSubPage?.template
            : 1
        }
        onTemplate={handleSetTemplate}
      />
      <TemplatePreviwe
        template={
          step === 2
            ? formik.values.template
            : step === 4
            ? formik?.values.subPage?.template
            : step === 6
            ? formik.values.secondSubPage?.template
            : formik.values.template
        }
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={() => onStep(step + 1)}>بعدی</Button>
        <Button onClick={() => onStep(step - 1)} variant="outline">
          قبلی
        </Button>
      </div>
    </>
  );
}

export default StepTwo;
