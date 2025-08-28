import { FormikProps } from "formik";
import { useState } from "react";
import { PlusIcon, TrashBinIcon } from "../../icons";
import Button from "../ui/button/Button";
import TitleModal from "../create-dynamic-page/title-modal";
import DescriptionModal from "../create-dynamic-page/DescriptionModal";
import ImageModal from "../create-dynamic-page/ImageModal";
import Label from "../form/Label";

interface Props {
  formik: FormikProps<any>;
  isLoading: boolean;
}

function UpdateContentPage({ formik, isLoading }: Props) {
  const [isOpenTitle, setIsOpenTitle] = useState<boolean>(false);
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<any>({});
  const [id, setId] = useState<number>(0);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full border-b py-2">
        <h1 className="dark:text-white font-bold text-xl">نمایش صفحه</h1>
        <div className="checkbox-wrapper-14 mt-4 flex gap-2 items-center">
          <input
            id="s1-14"
            type="checkbox"
            className="switch"
            defaultChecked={formik.values.show}
            checked={formik.values.show}
            onChange={() => {
              formik.setFieldValue("show", !formik.values.show);
            }}
          />
          <Label>این صفحه نمایش داده شود؟</Label>
        </div>
      </div>
      <div className="w-full  py-2">
        <h1 className="dark:text-white font-bold text-xl">محتوای صفحه</h1>
      </div>

      <div className="flex dark:text-white gap-2 mt-5">
        <div
          className="flex-1 justify-center flex p-5 border-1 rounded-md font-bold text-lg items-center cursor-pointer shadow-md"
          onClick={() => setIsOpenTitle(true)}
        >
          <PlusIcon />
          <span>افزودن عنوان</span>
        </div>

        <div
          className="flex-1 justify-center flex p-5 border-1 rounded-md font-bold text-lg items-center cursor-pointer shadow-md"
          onClick={() => setIsOpenDescription(true)}
        >
          <PlusIcon />
          <span>افزودن توضیحات</span>
        </div>
        <div
          className="flex-1 justify-center flex p-5 border-1 rounded-md font-bold text-lg items-center cursor-pointer shadow-md"
          onClick={() => setIsOpenImage(true)}
        >
          <PlusIcon />
          <span>افزودن تصویر</span>
        </div>
      </div>

      {formik.values.peContent?.length > 0 && (
        <div className="dark:text-white mt-5 flex-col gap-5 flex">
          <hr />
          <h2 className="font-bold text-2xl">پیش نمایش</h2>
          {formik.values.peContent?.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-800"
                startIcon={<TrashBinIcon />}
                onClick={() => {
                  formik.setFieldValue(
                    "peContent",
                    formik.values.peContent.filter(
                      (f: { _id: string }) => f._id !== item._id
                    )
                  );
                  formik.setFieldValue(
                    "enContent",
                    formik.values.enContent.filter(
                      (f: { _id: string }) => f._id !== item._id
                    )
                  );
                  formik.setFieldValue(
                    "ruContent",
                    formik.values.ruContent.filter(
                      (f: { _id: string }) => f._id !== item._id
                    )
                  );
                }}
              >
                <span className="sr-only">حذف</span>
              </Button>
              {/* <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-800"
                startIcon={<UpdateIcon />}
                onClick={() => {
                  if (item?.title === "title") {
                    setUpdateValue(item);
                    setId(item.id);
                    setIsOpenTitle(true);
                  }

                  if (item?.title === "description") {
                    setUpdateValue(item);
                    setId(item.id);
                    setIsOpenDescription(true);
                  }
                  if (item?.title === "images") {
                    setUpdateValue(item);
                    setId(item.id);
                    setIsOpenImage(true);
                  }
                }}
              >
                <span className="sr-only">اصلاح</span>
              </Button> */}
              {item?.title === "title" && (
                <h1 className="font-bold text-2xl">{item.content}</h1>
              )}
              {item?.title === "description" && (
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
              )}
              {item?.title === "images" && (
                <div className="grid grid-cols-3 gap-5">
                  {item?.content?.map(
                    (image: File | string, imgIndex: number) => (
                      <div key={imgIndex}>
                        <img
                          src={
                            typeof image === "string"
                              ? image
                              : URL.createObjectURL(image) || ""
                          }
                          alt={`Preview ${imgIndex}`}
                          className="mb-2 rounded-lg border border-gray-300"
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <TitleModal
        formik={formik}
        isOpen={isOpenTitle}
        onClose={() => {
          setIsOpenTitle(false);
          setId(0);
        }}
        update={updateValue}
        id={id}
      />
      <DescriptionModal
        formik={formik}
        isOpen={isOpenDescription}
        onClose={() => {
          setIsOpenDescription(false);
          setId(0);
        }}
        update={updateValue}
        id={id}
      />

      {isOpenImage && (
        <ImageModal
          isOpen={isOpenImage}
          formik={formik}
          onClose={() => {
            setIsOpenImage(false);
            setId(0);
          }}
          update={updateValue}
          id={id}
        />
      )}

      <div className="mt-4 flex gap-2">
        <Button
          type={"submit"}
          isLoading={isLoading}
          disabled={formik?.values.peContent?.length === 0}
        >
          به روز رسانی
        </Button>
      </div>
    </form>
  );
}

export default UpdateContentPage;
