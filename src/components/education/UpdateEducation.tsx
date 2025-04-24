import { useState } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { uploadFiles } from "../../server/uploadFiles";
import { educationSchema } from "../../utils/validation";
import { IEducation } from "../../types/education-types";
import { useMutation } from "@tanstack/react-query";
import { updateEducation } from "../../server/education";
import { Modal } from "../ui/modal";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import DropzoneComponent from "../form/form-elements/DropZone";
import DropzoneVideoComponent from "../form/form-elements/DropZoneVideo";
import Button from "../ui/button/Button";

function UpdateEducation({
  isOpen,
  onClose,
  refetch,
  data,
}: {
  isOpen: string;
  onClose: () => void;
  refetch: () => void;
  data: any;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [peImageFiles, setPeImageFiles] = useState<File[]>([]);
  const [enImageFiles, entEnImageFiles] = useState<File[]>([]);
  const [ruImageFiles, ruRuImageFiles] = useState<File[]>([]);

  const [peVideoFiles, setPeVideoFiles] = useState<File[]>([]);
  const [enVideoFiles, setEnVideoFiles] = useState<File[]>([]);
  const [ruVideoFiles, setRuVideoFiles] = useState<File[]>([]);

  const handleDeleteFile = (url: string, name: string) => {
    const cpValues: any = [...formik.values[name as keyof IEducation]];

    const fileterd = cpValues.filter((f: string) => f !== url);

    formik.setFieldValue(name, fileterd);

    toast.success("تصویر با موفقیت حذف شد");
  };

  const mutation = useMutation<
    unknown,
    any,
    { id: string; values: IEducation }
  >({
    mutationKey: ["updateEducation"],
    mutationFn: ({ id, values }: { id: string; values: IEducation }) =>
      updateEducation(id, values),
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("آموزش با موفقیت به روزرسانی شد");
        onClose();
        refetch();
        formik.resetForm();
        setPeImageFiles([]);
        entEnImageFiles([]);
        ruRuImageFiles([]);
        setPeVideoFiles([]);
        setEnVideoFiles([]);
        setRuVideoFiles([]);
      } else {
        toast.error("آموزش به روزرسانی نشد ، لطفا دوباره امتحان کنید");
        onClose();
        formik.resetForm();
        setPeImageFiles([]);
        entEnImageFiles([]);
        ruRuImageFiles([]);
        setPeVideoFiles([]);
        setEnVideoFiles([]);
        setRuVideoFiles([]);
      }
    },
  });

  const formik = useFormik<IEducation>({
    initialValues: {
      peTitle: data.peTitle,
      enTitle: data.enTitle,
      ruTitle: data.ruTitle,
      peDescription: data.peDescription,
      enDescription: data.enDescription,
      ruDescription: data.ruDescription,
      peEducationBody: data.peEducationBody,
      enEducationBody: data.enEducationBody,
      ruEducationBody: data.ruEducationBody,
      pePictures: data.pePictures,
      enPictures: data.enPictures,
      ruPictures: data.ruPictures,
      peVideo: data.peVideo,
      enVideo: data.enVideo,
      ruVideo: data.ruVideo,
    },
    enableReinitialize: true,
    validationSchema: educationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (peImageFiles.length) {
        const formData = new FormData();
        peImageFiles.forEach((file) => formData.append("picture", file));

        const response: { data: string[]; success: boolean } =
          await uploadFiles(formData);

        if (response.success) {
          values.pePictures = values.pePictures.concat(response.data);
          toast.success("تصاویر آموزش فارسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر آموزش فارسی آپلود نشد");
        }
      }
      if (enImageFiles.length) {
        const formData = new FormData();
        enImageFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.enPictures = values.enPictures.concat(response.data);
          toast.success("تصاویر آموزش انگلیسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر آموزش انگلیسی آپلود نشد");
        }
      }
      if (ruImageFiles.length) {
        const formData = new FormData();
        ruImageFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.ruPictures = values.ruPictures.concat(response.data);
          toast.success("تصاویر آموزش روسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر آموزش روسی آپلود نشد");
        }
      }

      if (peVideoFiles.length) {
        const formData = new FormData();
        peVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.peVideo = values.peVideo.concat(response.data);
          toast.success("ویدیو آموزش فارسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو آموزش فارسی آپلود نشد");
        }
      }

      if (enVideoFiles.length) {
        const formData = new FormData();
        enVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.enVideo = values.enVideo.concat(response.data);
          toast.success("ویدیو آموزش انگلیسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو آموزش انگلیسی آپلود نشد");
        }
      }

      if (ruVideoFiles.length) {
        const formData = new FormData();
        ruVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.ruVideo = values.ruVideo.concat(response.data);
          toast.success("ویدیو آموزش روسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو آموزش روسی آپلود نشد");
        }
      }

      setIsLoading(false);
      console.log(values);
      console.log(data);
      mutation.mutate({ id: data?._id, values });
    },
  });

  return (
    <>
      <Modal isOpen={!!isOpen} onClose={onClose}>
        <h1 className="font-bold text-lg text-center w-full mb-8">
          به روز رسانی آموزش
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <ComponentCard title="عنوان آموزش" className="my-2">
            <div className="flex gap-4">
              <div>
                <Label htmlFor="pe-input">عنوان فارسی</Label>
                <Input
                  type="text"
                  id="pe-input"
                  placeholder="عنوان فارسی را وارد کنید"
                  error={formik.errors.peTitle ? true : false}
                  {...formik.getFieldProps("peTitle")}
                />
                {formik.errors.peTitle && formik.touched.peTitle && (
                  <span className="text-sm text-error-500">
                    {formik.errors.peTitle}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="en-input">عنوان انگلیسی</Label>
                <Input
                  type="text"
                  id="en-input"
                  placeholder="عنوان انگلیسی را وارد کنید"
                  error={formik.errors.enTitle ? true : false}
                  {...formik.getFieldProps("enTitle")}
                />
                {formik.errors.enTitle && formik.touched.enTitle && (
                  <span className="text-sm text-error-500">
                    {formik.errors.enTitle}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="ru-input">عنوان روسی</Label>
                <Input
                  type="text"
                  id="ru-input"
                  placeholder="عنوان روسی را وارد کنید"
                  error={formik.errors.ruTitle ? true : false}
                  {...formik.getFieldProps("ruTitle")}
                />
                {formik.errors.ruTitle && formik.touched.ruTitle && (
                  <span className="text-sm text-error-500">
                    {formik.errors.ruTitle}
                  </span>
                )}
              </div>
            </div>
          </ComponentCard>
          <ComponentCard title="توضیحات آموزش" className="my-2">
            <div>
              <Label htmlFor="ru-input">توضیحات فارسی</Label>
              <TextArea
                placeholder="توضیحات فارسی را وارد کنید"
                error={formik.errors.peDescription ? true : false}
                name="peDescription"
                formik={formik}
              />
              {formik.errors.peDescription && formik.touched.peDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.peDescription}
                </span>
              )}
            </div>
            <div>
              <TextArea
                placeholder="توضیحات انگلیسی را وارد کنید"
                error={formik.errors.enDescription ? true : false}
                formik={formik}
                name="enDescription"
              />
              {formik.errors.enDescription && formik.touched.enDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.enDescription}
                </span>
              )}
            </div>
            <div>
              <TextArea
                placeholder="توضیحات روسی را وارد کنید"
                error={formik.errors.ruDescription ? true : false}
                formik={formik}
                name="ruDescription"
              />
              {formik.errors.ruDescription && formik.touched.ruDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.ruDescription}
                </span>
              )}
            </div>
          </ComponentCard>
          <ComponentCard title="توضیحات تکمیلی" className="my-2">
            <div>
              <Label htmlFor="ru-input">توضیحات تکمیلی فارسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی فارسی را وارد کنید"
                error={formik.errors.peEducationBody ? true : false}
                formik={formik}
                name="peEducationBody"
              />
              {formik.errors.peEducationBody &&
                formik.touched.peEducationBody && (
                  <span className="text-sm text-error-500">
                    {formik.errors.peEducationBody}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="ru-input">توضیحات تکمیلی انگلیسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی انگلیسی را وارد کنید"
                error={formik.errors.enEducationBody ? true : false}
                formik={formik}
                name="enEducationBody"
              />
              {formik.errors.enEducationBody &&
                formik.touched.enEducationBody && (
                  <span className="text-sm text-error-500">
                    {formik.errors.enEducationBody}
                  </span>
                )}
            </div>
            <div>
              <Label htmlFor="ru-input">توضیحات تکمیلی روسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی روسی را وارد کنید"
                error={formik.errors.ruEducationBody ? true : false}
                formik={formik}
                name="ruEducationBody"
              />
              {formik.errors.ruEducationBody &&
                formik.touched.ruEducationBody && (
                  <span className="text-sm text-error-500">
                    {formik.errors.ruEducationBody}
                  </span>
                )}
            </div>
          </ComponentCard>
          <ComponentCard title="تصاویر آموزش" className="my-2">
            <DropzoneComponent
              multiple
              title="تصاویر آموزش فارسی"
              onFiles={setPeImageFiles}
              update="pePictures"
              formik={formik}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
            <DropzoneComponent
              multiple
              title="تصاویر آموزش انگلیسی"
              onFiles={entEnImageFiles}
              update="enPictures"
              formik={formik}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
            <DropzoneComponent
              multiple
              title="تصاویر آموزش روسی"
              onFiles={ruRuImageFiles}
              update="ruPictures"
              formik={formik}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
          </ComponentCard>
          <ComponentCard title="ویدیو آموزش" className="my-2">
            <DropzoneVideoComponent
              multiple
              title="ویدیو آموزش فارسی"
              onFiles={setPeVideoFiles}
              update="peVideo"
              formik={formik}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
            <DropzoneVideoComponent
              multiple
              title="ویدیو آموزش انگلیسی"
              onFiles={setEnVideoFiles}
              update="enVideo"
              formik={formik}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
            <DropzoneVideoComponent
              multiple
              title="ویدیو آموزش روسی"
              onFiles={setRuVideoFiles}
              update="ruVideo"
              formik={formik}
              onDelete={(url, name) => handleDeleteFile(url, name)}
            />
          </ComponentCard>

          <div className="flex gap-4 p-4 m-4">
            <Button type="submit" isLoading={mutation.isPending || isLoading}>
              ثبت
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
            >
              انصراف
            </Button>
          </div>
        </form>
      </Modal>
      {/* <Confirm
        isOpen={!!isOpenConfirm.url}
        onClose={handleCloseConfirm}
        onSubmit={() => handleDeleteFile()}
        isLoading={false}
        message="آیا میخواهید این تصویر را حذف کنید؟"
      /> */}
    </>
  );
}

export default UpdateEducation;
