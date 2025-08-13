import ComponentCard from "../common/ComponentCard";

function TemplatePreviwe({ template }: { template: number }) {
  return (
    <ComponentCard
      title={
        template === 1 ? "قالب اول" : template === 2 ? "قالب دوم" : "قالب سوم"
      }
      className="mt-4"
    >
      {template === 1 && (
        <>
          <div className="max-w-full flex gap-10 justify-center items-center">
            <div className="border-dashed border rounded-md flex-1 p-10 flex justify-center items-center my-5 dark:text-white font-bold text-xl bg-gray-200 dark:bg-gray-600">
              تصویر
            </div>
            <div className="flex-1 flex flex-col justify-between items-center gap-10">
              <h2 className="text-bold dark:text-white bg-gray-200 dark:bg-gray-600 w-full text-center p-1 rounded-full">
                عنوان صفحه
              </h2>
              <h2 className="text-bold dark:text-white bg-gray-200 dark:bg-gray-600 w-full text-center p-1 rounded-full">
                متن کوتاه توضیحات صفحه
              </h2>
            </div>
          </div>
          <h2 className="text-bold dark:text-white bg-gray-200 dark:bg-gray-600 w-full text-center p-1 rounded-full">
            متن تکمیلی
          </h2>
        </>
      )}
      {template === 2 && (
        <>
          <div className="max-w-full flex gap-10 justify-center items-center">
            <div className="border-dashed border rounded-md flex-1 p-10 flex justify-center items-center my-5 dark:text-white font-bold text-xl bg-gray-200 dark:bg-gray-600">
              اسلایدر تصاویر
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between items-center gap-10">
            <h2 className="text-bold dark:text-white bg-gray-200 dark:bg-gray-600 w-full text-center p-1 rounded-full">
              عنوان صفحه
            </h2>
            <h2 className="text-bold dark:text-white bg-gray-200 dark:bg-gray-600 w-full text-center p-1 rounded-full">
              متن توضیحات صفحه
            </h2>
          </div>
        </>
      )}
      {template === 3 && (
        <>
          <div className="flex-1 flex flex-col justify-between items-center gap-10">
            <h2 className="text-bold dark:text-white bg-gray-200 dark:bg-gray-600 w-full text-center p-1 rounded-full">
              عنوان صفحه
            </h2>
            <h2 className="text-bold dark:text-white bg-gray-200 dark:bg-gray-600 w-full text-center p-1 rounded-full">
              متن توضیحات صفحه
            </h2>
          </div>
          <div className="max-w-full flex gap-10 justify-center items-center">
            <div className="border-dashed border rounded-md flex-1 p-10 flex justify-center items-center my-5 dark:text-white font-bold text-xl bg-gray-200 dark:bg-gray-600">
              جدول
            </div>
          </div>
        </>
      )}
    </ComponentCard>
  );
}

export default TemplatePreviwe;
