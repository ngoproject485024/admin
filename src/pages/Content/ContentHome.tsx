import { useFormik } from "formik";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import Button from "../../components/ui/button/Button";
import { useState } from "react";
import { uploadFiles } from "../../server/uploadFiles";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHomeData, homePage } from "../../server/content";
import Loading from "../../components/loading";
import { homeDataSchema } from "../../utils/validation";

function ContentHome() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mainFile, setMainFile] = useState<File[]>([]);
  const [middleFiles, setMiddleFiles] = useState<File[]>([]);

  const { data, isLoading: isLoadingData } = useQuery({
    queryKey: ["getHomeData"],
    queryFn: getHomeData,
  });

  const {
    mainImages,
    middleImages,
    peDescription,
    enDescription,
    ruDescription,
    peMiddleImageDescription,
    enMiddleImageDescription,
    ruMiddleImageDescription,
    peProjectDescription,
    enProjectDescription,
    ruProjectDescription,
    peAboutUsDescription,
    enAboutUsDescription,
    ruAboutUsDescription,
    peNgoDescription,
    enNgoDescription,
    ruNgoDescription,
  } = data?.data?.home ?? {};

  const mutation = useMutation({
    mutationKey: ["homePage"],
    mutationFn: homePage,
    onSuccess: (data: any) => {
      if (data.success) {
        // formik.resetForm();
        toast.success("محتوای صفحه اصلی با موفقیت تغییر کرد");
        setMainFile([]);
        setMiddleFiles([]);
      } else {
        toast.error("محتوای صفحه اصلی تغییر نکرد ، لطفا دوباره امتحان کنید");
      }
      setIsLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      mainImages: mainImages ? mainImages : [],
      middleImages: middleImages ? middleImages : [],
      peDescription: peDescription ? peDescription : "",
      enDescription: enDescription ? enDescription : "",
      ruDescription: ruDescription ? ruDescription : "",
      peMiddleImageDescription: peMiddleImageDescription
        ? peMiddleImageDescription
        : "",
      enMiddleImageDescription: enMiddleImageDescription
        ? enMiddleImageDescription
        : "",
      ruMiddleImageDescription: ruMiddleImageDescription
        ? ruMiddleImageDescription
        : "",
      peProjectDescription: peProjectDescription ? peProjectDescription : "",
      enProjectDescription: enProjectDescription ? enProjectDescription : "",
      ruProjectDescription: ruProjectDescription ? ruProjectDescription : "",
      peAboutUsDescription: peAboutUsDescription ? peAboutUsDescription : "",
      enAboutUsDescription: enAboutUsDescription ? enAboutUsDescription : "",
      ruAboutUsDescription: ruAboutUsDescription ? ruAboutUsDescription : "",
      peNgoDescription: peNgoDescription ? peNgoDescription : "",
      enNgoDescription: enNgoDescription ? enNgoDescription : "",
      ruNgoDescription: ruNgoDescription ? ruNgoDescription : "",
    },
    enableReinitialize: true,
    validationSchema: homeDataSchema,
    onSubmit: async (values: any) => {
      setIsLoading(true);
      if (mainFile.length > 0 || middleFiles.length > 0) {
        if (mainFile.length > 0) {
          const formData = new FormData();

          mainFile?.forEach((file) => {
            formData.append("picture", file);
          });

          const response = await uploadFiles(formData);

          if (response.success) {
            values.mainImages = response.data;
            toast.success("تصاویر اصلی آپلود شدند");
          } else {
            toast.error("تصاویر اصلی آپلود نشدند ، لطفا دوباره امتحان کنید");
            setIsLoading(false);

            return;
          }
        }

        if (middleFiles.length > 0) {
          const middleFormData = new FormData();

          middleFiles.forEach((file) => {
            middleFormData.append("picture", file);
          });

          const responseMiddle = await uploadFiles(middleFormData);

          if (responseMiddle.success) {
            values.middleImages = responseMiddle.data;
            toast.success("تصاویر میانی آپلود شدند");
          } else {
            toast.error("تصاویر میانی آپلود نشدند ، لطفا دوباره امتحان کنید");
            setIsLoading(false);

            return;
          }
        }

        mutation.mutate(values);
      } else {
        mutation.mutate(values);
      }
    },
  });

  if (isLoadingData) {
    return <Loading />;
  }

  return (
    <div>
      <PageMeta title="محتوا | خانه" description="محتوای صفحه اصلی سایت" />
      <PageBreadcrumb pageTitle="محتوا" subMenu="خانه" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <DropzoneComponent
          title="تصویر اصلی"
          multiple
          onFiles={setMainFile}
          formik={formik}
          formikImages={formik?.values?.mainImages}
          name="mainImages"
        />
        <TextAreaInput
          title="توضیحات صفحه اصلی (فارسی)"
          formik={formik}
          name="peDescription"
          error={formik.errors.peDescription ? true : false}
          hint={
            typeof formik.errors.peDescription === "string"
              ? formik.errors.peDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات صفحه اصلی (انگلیسی)"
          formik={formik}
          name="enDescription"
          error={formik.errors.enDescription ? true : false}
          hint={
            typeof formik.errors.enDescription === "string"
              ? formik.errors.enDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات صفحه اصلی (روسی)"
          formik={formik}
          name="ruDescription"
          error={formik.errors.ruDescription ? true : false}
          hint={
            typeof formik.errors.ruDescription === "string"
              ? formik.errors.ruDescription
              : ""
          }
        />
        <DropzoneComponent
          title="تصاویر میانی"
          multiple
          onFiles={setMiddleFiles}
          formik={formik}
          name="middleImages"
          formikImages={formik?.values?.middleImages}
        />
        <TextAreaInput
          title="توضیحات تصاویر میانی (فارسی)"
          formik={formik}
          name="peMiddleImageDescription"
          error={formik.errors.peMiddleImageDescription ? true : false}
          hint={
            typeof formik.errors.peMiddleImageDescription === "string"
              ? formik.errors.peMiddleImageDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات تصاویر میانی (انگلیسی)"
          formik={formik}
          name="enMiddleImageDescription"
          error={formik.errors.enMiddleImageDescription ? true : false}
          hint={
            typeof formik.errors.enMiddleImageDescription === "string"
              ? formik.errors.enMiddleImageDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات تصاویر میانی (روسی)"
          formik={formik}
          name="ruMiddleImageDescription"
          error={formik.errors.ruMiddleImageDescription ? true : false}
          hint={
            typeof formik.errors.ruMiddleImageDescription === "string"
              ? formik.errors.ruMiddleImageDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات بخش پروژه ها (فارسی)"
          formik={formik}
          name="peProjectDescription"
          error={formik.errors.peProjectDescription ? true : false}
          hint={
            typeof formik.errors.peProjectDescription === "string"
              ? formik.errors.peProjectDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات بخش پروژه ها (انگلیسی)"
          formik={formik}
          name="enProjectDescription"
          error={formik.errors.enProjectDescription ? true : false}
          hint={
            typeof formik.errors.enProjectDescription === "string"
              ? formik.errors.enProjectDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات بخش پروژه ها (روسی)"
          formik={formik}
          name="ruProjectDescription"
          error={formik.errors.ruProjectDescription ? true : false}
          hint={
            typeof formik.errors.ruProjectDescription === "string"
              ? formik.errors.ruProjectDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات درباره ما (فارسی)"
          formik={formik}
          name="peAboutUsDescription"
          error={formik.errors.peAboutUsDescription ? true : false}
          hint={
            typeof formik.errors.peAboutUsDescription === "string"
              ? formik.errors.peAboutUsDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات درباره ما (انگلیسی)"
          formik={formik}
          name="enAboutUsDescription"
          error={formik.errors.enAboutUsDescription ? true : false}
          hint={
            typeof formik.errors.enAboutUsDescription === "string"
              ? formik.errors.enAboutUsDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات درباره ما (روسی)"
          formik={formik}
          name="ruAboutUsDescription"
          error={formik.errors.ruAboutUsDescription ? true : false}
          hint={
            typeof formik.errors.ruAboutUsDescription === "string"
              ? formik.errors.ruAboutUsDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات سمن ها (فارسی)"
          formik={formik}
          name="peNgoDescription"
          error={formik.errors.peNgoDescription ? true : false}
          hint={
            typeof formik.errors.peNgoDescription === "string"
              ? formik.errors.peNgoDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات سمن ها (انگلیسی)"
          formik={formik}
          name="enNgoDescription"
          error={formik.errors.enNgoDescription ? true : false}
          hint={
            typeof formik.errors.enNgoDescription === "string"
              ? formik.errors.enNgoDescription
              : ""
          }
        />
        <TextAreaInput
          title="توضیحات سمن ها (روسی)"
          formik={formik}
          name="ruNgoDescription"
          error={formik.errors.ruNgoDescription ? true : false}
          hint={
            typeof formik.errors.ruNgoDescription === "string"
              ? formik.errors.ruNgoDescription
              : ""
          }
        />
        <div className="flex gap-2 mt-2">
          <Button type="submit" isLoading={mutation.isPending || isLoading}>
            ثبت
          </Button>
          <Button variant="outline">انصراف</Button>
        </div>
      </form>
    </div>
  );
}

export default ContentHome;
