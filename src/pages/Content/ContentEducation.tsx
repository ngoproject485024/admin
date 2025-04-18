import { useFormik } from "formik";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createDescriptionPage,
  getDescriptionPage,
} from "../../server/content";
import Loading from "../../components/loading";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import toast from "react-hot-toast";

function ContentEducation() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getDescriptionPage"],
    queryFn: () => getDescriptionPage("educations"),
  });

  console.log("ddd", data);

  const mutation = useMutation({
    mutationKey: ["createDescriptionPage"],
    mutationFn: createDescriptionPage,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای صفحه آموزش و پرورش با موفقیت تغییر کرد");
        formik.resetForm();
        refetch();
      } else {
        toast.error(
          "متاسفانه محتوای صفحه آموزش و پرورش تغییر نکرد ، لطفا مجددا تلاش کنید"
        );
      }
    },
  });

  console.log("ddd", data);

  const formik = useFormik({
    initialValues: {
      peDescription: data?.data?.peDescription,
      enDescription: data?.data?.enDescription,
      ruDescription: data?.data?.ruDescription,
    },
    validationSchema: Yup.object().shape({
      peDescription: Yup.string().required("لطفا توضیحات فارسی را وارد کنید"),
      enDescription: Yup.string().required("لطفا توضیحات انگلیسی را وارد کنید"),
      ruDescription: Yup.string().required("لطفا توضیحات روسی را وارد کنید"),
    }),
    enableReinitialize: true,
    onSubmit: (values: any) => {
      const value = {
        description: {
          peDescription: values.peDescription,
          enDescription: values.enDescription,
          ruDescription: values.ruDescription,
        },
        type: "educations",
      };
      mutation.mutate(value);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageMeta
        title="محتوا | آموزش و پرورش"
        description="محتوای صفحه آموزش و پرورش"
      />
      <PageBreadcrumb pageTitle="محتوا" subMenu="آموزش و پرورش" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard title="توضیحات آموزش و پرورش">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آموزش و پرورش (فارسی)"
              formik={formik}
              name="peDescription"
              error={formik.errors.peDescription ? true : false}
              hint={
                typeof formik.errors.peDescription === "string"
                  ? formik.errors.peDescription
                  : ""
              }
            />
          </div>
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آموزش و پرورش (انگلیسی)"
              formik={formik}
              name="enDescription"
              error={formik.errors.enDescription ? true : false}
              hint={
                typeof formik.errors.enDescription === "string"
                  ? formik.errors.enDescription
                  : ""
              }
            />
          </div>
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات آموزش و پرورش (روسی)"
              formik={formik}
              name="ruDescription"
              error={formik.errors.ruDescription ? true : false}
              hint={
                typeof formik.errors.ruDescription === "string"
                  ? formik.errors.ruDescription
                  : ""
              }
            />
          </div>
        </ComponentCard>

        <div className="flex gap-2 mt-2">
          <Button isLoading={mutation.isPending} type="submit">
            ثبت
          </Button>
          <Button variant="outline" onClick={() => formik.resetForm()}>
            انصراف
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContentEducation;
