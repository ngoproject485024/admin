import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import { TimesIcon } from "../../../icons";
import convertBlobToFile from "../../../utils/convertBlobToFile";

interface IDropZoneComponent {
  title: string | undefined;
  multiple: boolean;
  onFiles?: (files: File[]) => void;
  files?: File[];
  update?: string;
  formik?: any;
  onDelete?: (url: string, name: string) => void;
  name?: string;
  formikImages: string[];
  dropTitle?: string;
  dropDescription?: string;
  accept?: any;
  max?: number;
}

const DropzoneComponent: React.FC<IDropZoneComponent> = ({
  title,
  multiple,
  onFiles,
  files,
  update,
  formik,
  onDelete,
  name,
  formikImages,
  dropTitle,
  dropDescription,
  accept,
  max,
}) => {
  const [thumbImage, setThumbImage] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    // Handle file uploads here
    const paths: string[] = acceptedFiles.map((file: File) => {
      const path = URL.createObjectURL(file);
      return path;
    });

    if (multiple) {
      setThumbImage((prev: string[]) => [...prev, paths]);
      onFiles?.((prev: File[]) => prev.concat(acceptedFiles));
    } else {
      setThumbImage(paths);
      onFiles?.(acceptedFiles);
      formik.setFieldValue(name, []);
    }
  };

  const handleDelteFile = ({ url, name }: { url: string; name: string }) =>
    onDelete && onDelete(url, name);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept || {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    multiple: multiple,
    maxFiles: max || 5,
  });
  return (
    <ComponentCard title={title ? title : ""}>
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <form
          {...getRootProps()}
          className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
        ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }
      `}
          id="demo-upload"
        >
          {/* Hidden Input */}
          <input {...getInputProps()} />

          <div className="dz-message flex flex-col items-center m-0">
            {/* Icon Container */}
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <svg
                  className="fill-current"
                  width="29"
                  height="28"
                  viewBox="0 0 29 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                  />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
              {dropTitle ? (
                <>{isDragActive ? "اینجا رها کنید" : dropTitle}</>
              ) : (
                <>
                  {isDragActive
                    ? "اینجا رها کنید"
                    : "تصویر را بکشید و اینجا رها کنید"}
                </>
              )}
            </h4>

            <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              {dropDescription ? (
                <>{dropDescription}</>
              ) : (
                <>
                  تصاویر PNG, JPG, WebP, SVG خود را اینجا بکشید و رها کنید و یا
                  انتخاب کنید
                </>
              )}
            </span>
            <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              {multiple ? <>حداکثر {max || 5}</> : <>حداکثر {max || 1}</>}
            </span>

            <span className="font-medium underline text-theme-sm text-brand-500">
              {dropTitle ? <>فایل را انتخاب کنید</> : <>انتخاب تصویر</>}
            </span>
          </div>
        </form>

        {formikImages && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-center justify-center mb-3 w-full gap-5 flex-wrap">
            {formikImages?.map((image: string) => (
              <>
                {image?.slice(image.length - 3, image.length) === "pdf" ? (
                  <div
                    key={image}
                    className="flex items-center justify-center mb-3 p-8 relative"
                  >
                    <div
                      className="absolute top-0 right-0"
                      onClick={() => {
                        if (name) {
                          const cpImages = [...formik.values[name]];
                          const filterd = cpImages.filter((f) => f !== image);
                          formik.setFieldValue(name, filterd);
                        }
                      }}
                    >
                      <TimesIcon className="text-red-500" />
                    </div>
                    <object
                      data={image || ""}
                      type="application/pdf"
                      className="w-full h-[500px]"
                    />
                  </div>
                ) : (
                  <div
                    key={image}
                    className="flex items-center justify-center mb-3 p-8 relative"
                  >
                    <div
                      className="absolute top-0 right-0"
                      onClick={() => {
                        if (name) {
                          const cpImages = [...formik.values[name]];
                          const filterd = cpImages.filter((f) => f !== image);
                          formik.setFieldValue(name, filterd);
                        }
                      }}
                    >
                      <TimesIcon className="text-red-500" />
                    </div>
                    <img
                      src={image}
                      alt="uploaded image"
                      className="object-contain"
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        )}

        {thumbImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center mb-3 w-full gap-5 flex-wrap">
            {thumbImage?.map((file: string) => (
              <>
                {accept && Object?.keys(accept).includes("application/pdf") ? (
                  <div className="relative">
                    <div
                      className="absolute"
                      onClick={() => {
                        const cpThumbImage = [...thumbImage];
                        const filtered = cpThumbImage.filter((f) => f !== file);
                        setThumbImage(filtered);

                        convertBlobToFile(file).then((getFile: File) => {
                          if (files) {
                            const cpFiles = [...files];
                            const filtered = cpFiles.filter(
                              (f) => f.size !== getFile.size
                            );
                            onFiles?.(filtered);
                          }
                        });
                      }}
                    >
                      <TimesIcon color="red" />
                    </div>
                    <object
                      data={file || ""}
                      type="application/pdf"
                      className="w-full h-[500px]"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div
                      className="absolute"
                      onClick={() => {
                        const cpThumbImage = [...thumbImage];
                        const filtered = cpThumbImage.filter((f) => f !== file);
                        setThumbImage(filtered);

                        convertBlobToFile(file).then((getFile: File) => {
                          if (files) {
                            const cpFiles = [...files];
                            const filtered = cpFiles.filter(
                              (f) => f.size !== getFile.size
                            );
                            onFiles?.(filtered);
                          }
                        });
                      }}
                    >
                      <TimesIcon color="red" />
                    </div>
                    <div
                      key={file}
                      className="flex items-center justify-center mb-3 p-8 "
                    >
                      <img
                        src={file}
                        alt="uploaded image"
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        )}

        {!!update && (
          <>
            {formik.values[update]?.map((image: string) => (
              <div
                key={image}
                className="flex items-center justify-center mb-3 "
              >
                <div className="relative p-8">
                  <img
                    src={image}
                    alt="uploaded image"
                    className="object-contain"
                  />
                  <button
                    className="absolute top-0 z-10 bg-rose-500 p-1 rounded-full text-white"
                    onClick={() =>
                      handleDelteFile({ url: image, name: update })
                    }
                  >
                    <TimesIcon fontSize={20} />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </ComponentCard>
  );
};

export default DropzoneComponent;
