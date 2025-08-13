import ComponentCard from "../common/ComponentCard";

interface Props {
  title: string;
  template: number;
  onTemplate: (value: number) => void;
}

function TemplateSelector({ title, template, onTemplate }: Props) {
  return (
    <ComponentCard title={title} desc="لطفا قالب مورد نظر را انتخاب کنید">
      <div className="flex flex-col md:flex-row gap-4">
        <div
          className={`flex-1 shadow-lg border-1 rounded-md dark:border-gray-500 p-4 cursor-pointer  ${
            template === 1
              ? "bg-gray-200 dark:bg-gray-600"
              : "dark:shadow-gray-800"
          }`}
          onClick={() => onTemplate(1)}
        >
          <h2 className="dark:text-white text-xl font-bold my-4">قالب اول</h2>
          <div className="border-b my-2 dark:border-gray-700"></div>
          <p className="dark:text-white font-light">
            این قالب شامل تصویر ، عنوان صفحه ، متن کوتاه توضیحات و متن تکمیلی
            است
          </p>
        </div>
        <div
          className={`flex-1 shadow-md border-1 rounded-md dark:border-gray-500 p-4 cursor-pointer  ${
            template === 2
              ? "bg-gray-200 dark:bg-gray-600"
              : "dark:shadow-gray-800"
          }`}
          onClick={() => onTemplate(2)}
        >
          <h2 className="dark:text-white text-xl font-bold my-4">قالب دوم</h2>
          <div className="border-b my-2 dark:border-gray-700"></div>
          <p className="dark:text-white font-light">
            این قالب شامل اسلایدر تصاویر ، عنوان صفحه و متن توضیحات است
          </p>
        </div>
        <div
          className={`flex-1 shadow-md border-1 rounded-md dark:border-gray-500 p-4 cursor-pointer  ${
            template === 3
              ? "bg-gray-200 dark:bg-gray-600"
              : "dark:shadow-gray-800"
          }`}
          onClick={() => onTemplate(3)}
        >
          <h2 className="dark:text-white text-xl font-bold my-4">قالب سوم</h2>
          <div className="border-b my-2 dark:border-gray-700"></div>
          <p className="dark:text-white font-light">
            این قالب شامل عنوان صفحه، متن توضیحات و جدول است
          </p>
        </div>
      </div>
    </ComponentCard>
  );
}

export default TemplateSelector;
