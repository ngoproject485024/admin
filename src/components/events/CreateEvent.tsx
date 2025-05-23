import { useState } from "react";
import { PlusIcon } from "../../icons";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useFormik } from "formik";
import TextArea from "../form/input/TextArea";
import DropzoneComponent from "../form/form-elements/DropZone";
import DropzoneVideoComponent from "../form/form-elements/DropZoneVideo";
import { uploadFiles } from "../../server/uploadFiles";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../../server/events";
import { eventsSchema } from "../../utils/validation";
import TextEditor from "../common/TextEditor";

function CreateEvent({ refetch }: { refetch: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [peImageFiles, setPeImageFiles] = useState<File[]>([]);
  const [enImageFiles, entEnImageFiles] = useState<File[]>([]);
  const [ruImageFiles, ruRuImageFiles] = useState<File[]>([]);

  const [peVideoFiles, setPeVideoFiles] = useState<File[]>([]);
  const [enVideoFiles, setEnVideoFiles] = useState<File[]>([]);
  const [ruVideoFiles, setRuVideoFiles] = useState<File[]>([]);

  const handleClose = () => setIsOpen(false);

  const mutation = useMutation({
    mutationKey: ["createEvent"],
    mutationFn: createEvent,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("رویداد با موفقیت ایجاد شد");
        handleClose();
        refetch();
        formik.resetForm();
        setPeImageFiles([]);
        entEnImageFiles([]);
        ruRuImageFiles([]);
        setPeVideoFiles([]);
        setEnVideoFiles([]);
        setRuVideoFiles([]);
      } else {
        toast.error("رویداد ایجاد نشد ، لطفا دوباره امتحان کنید");
        handleClose();
        formik.resetForm();
      }
    },
  });

  const formik = useFormik<{
    peTitle: string;
    enTitle: string;
    ruTitle: string;
    peDescription: string;
    enDescription: string;
    ruDescription: string;
    peEventsBody: string;
    enEventsBody: string;
    ruEventsBody: string;
    pePictures: [];
    enPictures: [];
    ruPictures: [];
    peVideo: [];
    enVideo: [];
    ruVideo: [];
  }>({
    initialValues: {
      peTitle: "",
      enTitle: "",
      ruTitle: "",
      peDescription: "",
      enDescription: "",
      ruDescription: "",
      peEventsBody: "",
      enEventsBody: "",
      ruEventsBody: "",
      pePictures: [],
      enPictures: [],
      ruPictures: [],
      peVideo: [],
      enVideo: [],
      ruVideo: [],
    },
    validationSchema: eventsSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (peImageFiles.length) {
        const formData = new FormData();
        peImageFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.pePictures = response.data;
          toast.success("تصاویر رویداد فارسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر رویداد فارسی آپلود نشد");
        }
      }
      if (enImageFiles.length) {
        const formData = new FormData();
        enImageFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.enPictures = response.data;
          toast.success("تصاویر رویداد انگلیسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر رویداد انگلیسی آپلود نشد");
        }
      }
      if (ruImageFiles.length) {
        const formData = new FormData();
        ruImageFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.ruPictures = response.data;
          toast.success("تصاویر رویداد روسی با موفقیت آپلود شد");
        } else {
          toast.error("تصاویر رویداد روسی آپلود نشد");
        }
      }

      if (peVideoFiles.length) {
        const formData = new FormData();
        peVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.peVideo = response.data;
          toast.success("ویدیو رویداد فارسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو رویداد فارسی آپلود نشد");
        }
      }

      if (enVideoFiles.length) {
        const formData = new FormData();
        enVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.enVideo = response.data;
          toast.success("ویدیو رویداد انگلیسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو رویداد انگلیسی آپلود نشد");
        }
      }

      if (ruVideoFiles.length) {
        const formData = new FormData();
        ruVideoFiles.forEach((file) => formData.append("picture", file));

        const response = await uploadFiles(formData);

        if (response.success) {
          values.ruVideo = response.data;
          toast.success("ویدیو رویداد روسی با موفقیت آپلود شد");
        } else {
          toast.error("ویدیو رویداد روسی آپلود نشد");
        }
      }

      setIsLoading(false);
      mutation.mutate(values);
    },
  });

  return (
    <>
      <Button endIcon={<PlusIcon />} size="sm" onClick={() => setIsOpen(true)}>
        افزودن رویداد
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose} isFullscreen>
        <h1 className="font-bold text-lg text-center w-full mb-8">
          افزودن رویداد جدید
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <ComponentCard title="عنوان رویداد">
            <div className="flex gap-4 my-2">
              <div className="flex-1">
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
              <div className="flex-1">
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
              <div className="flex-1">
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
              <TextEditor
                title="توضیحات (فارسی)"
                formik={formik}
                name="peDescription"
                lang="fa"
              />
              {/* <Label htmlFor="ru-input">توضیحات فارسی</Label>
              <TextArea
                placeholder="توضیحات فارسی را وارد کنید"
                error={formik.errors.peDescription ? true : false}
                name="peDescription"
                formik={formik}
              /> */}
              {formik.errors.peDescription && formik.touched.peDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.peDescription}
                </span>
              )}
            </div>
            <div>
              <TextEditor
                title="توضیحات (انگلیسی)"
                formik={formik}
                name="enDescription"
                lang="en"
              />
              {/* <TextArea
                placeholder="توضیحات انگلیسی را وارد کنید"
                error={formik.errors.enDescription ? true : false}
                formik={formik}
                name="enDescription"
              /> */}
              {formik.errors.enDescription && formik.touched.enDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.enDescription}
                </span>
              )}
            </div>
            <div>
              <TextEditor
                title="توضیحات (روسی)"
                formik={formik}
                name="ruDescription"
                lang="en"
              />
              {/* <TextArea
                placeholder="توضیحات روسی را وارد کنید"
                error={formik.errors.ruDescription ? true : false}
                formik={formik}
                name="ruDescription"
              /> */}
              {formik.errors.ruDescription && formik.touched.ruDescription && (
                <span className="text-sm text-error-500">
                  {formik.errors.ruDescription}
                </span>
              )}
            </div>
          </ComponentCard>
          <ComponentCard title="توضیحات تکمیلی" className="my-2">
            <div>
              <TextEditor
                title="توضیحات تکمیلی (فارسی)"
                formik={formik}
                name="peEventsBody"
                lang="fa"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی فارسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی فارسی را وارد کنید"
                error={formik.errors.peEventsBody ? true : false}
                formik={formik}
                name="peEventsBody"
              /> */}
              {formik.errors.peEventsBody && formik.touched.peEventsBody && (
                <span className="text-sm text-error-500">
                  {formik.errors.peEventsBody}
                </span>
              )}
            </div>
            <div>
              <TextEditor
                title="توضیحات تکمیلی (انگلیسی)"
                formik={formik}
                name="enEventsBody"
                lang="en"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی انگلیسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی انگلیسی را وارد کنید"
                error={formik.errors.enEventsBody ? true : false}
                formik={formik}
                name="enEventsBody"
              /> */}
              {formik.errors.enEventsBody && formik.touched.enEventsBody && (
                <span className="text-sm text-error-500">
                  {formik.errors.enEventsBody}
                </span>
              )}
            </div>
            <div>
              <TextEditor
                title="توضیحات تکمیلی (روسی)"
                formik={formik}
                name="ruEventsBody"
                lang="en"
              />
              {/* <Label htmlFor="ru-input">توضیحات تکمیلی روسی</Label>
              <TextArea
                placeholder="توضیحات تکمیلی روسی را وارد کنید"
                error={formik.errors.ruEventsBody ? true : false}
                formik={formik}
                name="ruEventsBody"
              /> */}
              {formik.errors.ruEventsBody && formik.touched.ruEventsBody && (
                <span className="text-sm text-error-500">
                  {formik.errors.ruEventsBody}
                </span>
              )}
            </div>
          </ComponentCard>
          <ComponentCard title="تصاویر رویداد" className="my-2">
            <DropzoneComponent
              multiple
              title="تصاویر رویداد فارسی"
              onFiles={setPeImageFiles}
            />
            <DropzoneComponent
              multiple
              title="تصاویر رویداد انگلیسی"
              onFiles={entEnImageFiles}
            />
            <DropzoneComponent
              multiple
              title="تصاویر رویداد روسی"
              onFiles={ruRuImageFiles}
            />
          </ComponentCard>
          <ComponentCard title="ویدیو رویداد">
            <DropzoneVideoComponent
              multiple
              title="ویدیو رویداد فارسی"
              onFiles={setPeVideoFiles}
            />
            <DropzoneVideoComponent
              multiple
              title="ویدیو رویداد انگلیسی"
              onFiles={setEnVideoFiles}
            />
            <DropzoneVideoComponent
              multiple
              title="ویدیو رویداد روسی"
              onFiles={setRuVideoFiles}
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
                handleClose();
              }}
            >
              انصراف
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default CreateEvent;
