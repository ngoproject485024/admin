import { useMutation, useQuery } from "@tanstack/react-query";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import Button from "../../components/ui/button/Button";
import { createAboutUs, getAboutUs } from "../../server/about-us";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../components/loading";
import { useState } from "react";
import { uploadFiles } from "../../server/uploadFiles";

function ContentAboutUs() {
  const [middleFiles, setMiddleFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAboutUs"],
    queryFn: () => getAboutUs(),
  });

  const mutation = useMutation({
    mutationKey: ["createAboutUs"],
    mutationFn: createAboutUs,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("محتوای صفحه درباره ما با موفقیت تغییر کرد");
        formik.resetForm();
        setLoading(false);
        refetch();
      } else {
        toast.error(
          "متاسفانه محتوای صفحه درباره ما تغییر نکرد ، لطفا مجددا تلاش کنید"
        );
        setLoading(false);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      middleImages: data?.data?.middleImages,
      peDescription: data?.data?.peDescription,
      enDescription: data?.data?.enDescription,
      ruDescription: data?.data?.ruDescription,
      peTitle: data?.data?.peTitle,
      enTitle: data?.data?.enTitle,
      ruTitle: data?.data?.ruTitle,
      peMiddleImageDescription: data?.data?.peMiddleImageDescription,
      enMiddleImageDescription: data?.data?.enMiddleImageDescription,
      ruMiddleImageDescription: data?.data?.ruMiddleImageDescription,
      peMissionAndGoals: data?.data?.peMissionAndGoals,
      enMissionAndGoals: data?.data?.enMissionAndGoals,
      ruMissionAndGoals: data?.data?.ruMissionAndGoals,
      // peAddress: data?.data?.peAddress,
      // enAddress: data?.data?.enAddress,
      // ruAddress: data?.data?.ruAddress,
      // phone: data?.data?.phone,
      // gmail: data?.data?.gmail,
      // instaLink: data?.data?.instaLink,
      // xLink: data?.data?.xLink,
      // linkedInLink: data?.data?.linkedInLink,
      // faceBookLink: data?.data?.faceBookLink,
    },
    validationSchema: Yup.object().shape({
      peDescription: Yup.string().required("لطفا توضیحات فارسی را وارد کنید"),
      enDescription: Yup.string().required("لطفا توضیحات انگلیسی را وارد کنید"),
      ruDescription: Yup.string().required("لطفا توضیحات روسی را وارد کنید"),
      peTitle: Yup.string().required("لطفا عنوان فارسی را وارد کنید"),
      enTitle: Yup.string().required("لطفا عنوان انگلیسی را وارد کنید"),
      ruTitle: Yup.string().required("لطفا عنوان روسی را وارد کنید"),
      peMiddleImageDescription: Yup.string().required(
        "لطفا توضیحات تصاویر میانی فارسی را وارد کنید"
      ),
      enMiddleImageDescription: Yup.string().required(
        "لطفا توضیحات تصاویر میانی انگلیسی را وارد کنید"
      ),
      ruMiddleImageDescription: Yup.string().required(
        "لطفا توضیحات تصاویر میانی روسی را وارد کنید"
      ),
      peMissionAndGoals: Yup.string().required(
        "لطفا توضیحات اهداف و دستاورد ها (فارسی) را وارد کنید"
      ),
      enMissionAndGoals: Yup.string().required(
        "لطفا توضیحات اهداف و دستاورد ها (انگلیسی) را وارد کنید"
      ),
      ruMissionAndGoals: Yup.string().required(
        "لطفا توضیحات اهداف و دستاورد ها (روسی) را وارد کنید"
      ),
    }),
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      setLoading(true);

      if (middleFiles.length > 0) {
        const middleFormData = new FormData();

        middleFiles.forEach((file) => {
          middleFormData.append("picture", file);
        });

        const responseMiddle = await uploadFiles(middleFormData);

        if (responseMiddle.success) {
          values.middleImages = responseMiddle.data;
          toast.success("تصاویر درباره ما آپلود شدند");
          setLoading(false);
        } else {
          toast.error("تصاویر درباره ما آپلود نشدند ، لطفا دوباره امتحان کنید");
          setLoading(false);

          return;
        }
      }

      setLoading(false);
      mutation.mutate(values);
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <PageMeta
        title="محتوا | درباه ما"
        description="محتوای صفحه درباه ما سایت"
      />
      <PageBreadcrumb pageTitle="محتوا" subMenu="درباه ما" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="عنوان درباه ما (فارسی)"
              formik={formik}
              name="peTitle"
              error={formik.errors.peTitle ? true : false}
              hint={
                typeof formik.errors.peTitle === "string"
                  ? formik.errors.peTitle
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="عنوان درباه ما (انگلیسی)"
              formik={formik}
              name="enTitle"
              error={formik.errors.enTitle ? true : false}
              hint={
                typeof formik.errors.enTitle === "string"
                  ? formik.errors.enTitle
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="عنوان درباه ما (روسی)"
              formik={formik}
              name="ruTitle"
              error={formik.errors.ruTitle ? true : false}
              hint={
                typeof formik.errors.ruTitle === "string"
                  ? formik.errors.ruTitle
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات درباه ما (فارسی)"
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
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات درباه ما (انگلیسی)"
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
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات درباه ما (روسی)"
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

        <DropzoneComponent
          title="تصاویر"
          onFiles={setMiddleFiles}
          formik={formik}
          formikImages={formik.values.middleImages}
          name="middleImages"
          multiple
        />
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
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
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
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
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
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
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات اهداف و دستاورد ها (فارسی)"
              formik={formik}
              name="peMissionAndGoals"
              error={formik.errors.peMissionAndGoals ? true : false}
              hint={
                typeof formik.errors.peMissionAndGoals === "string"
                  ? formik.errors.peMissionAndGoals
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات اهداف و دستاورد ها (انگلیسی)"
              formik={formik}
              name="enMissionAndGoals"
              error={formik.errors.enMissionAndGoals ? true : false}
              hint={
                typeof formik.errors.enMissionAndGoals === "string"
                  ? formik.errors.enMissionAndGoals
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <ComponentCard title="">
          <div>
            <TextAreaInput
              // value={message}
              // onChange={(value) => setMessage(value)}
              title="توضیحات اهداف و دستاورد ها (روسی)"
              formik={formik}
              name="ruMissionAndGoals"
              error={formik.errors.ruMissionAndGoals ? true : false}
              hint={
                typeof formik.errors.ruMissionAndGoals === "string"
                  ? formik.errors.ruMissionAndGoals
                  : ""
              }
            />
          </div>
        </ComponentCard>
        <div className="flex gap-2 mt-2">
          <Button isLoading={mutation.isPending || loading} type="submit">
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

export default ContentAboutUs;
