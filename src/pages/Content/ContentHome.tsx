import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import Button from "../../components/ui/button/Button";

function ContentHome() {
  return (
    <div>
      <PageMeta title="محتوا | خانه" description="محتوای صفحه اصلی سایت" />
      <PageBreadcrumb pageTitle="محتوا" subMenu="خانه" />
      <div className="flex flex-col gap-2">
        <DropzoneComponent title="تصویر اصلی" multiple={false} />
        <TextAreaInput title="توضیحات صفحه اصلی" />
        <DropzoneComponent title="تصاویر میانی" multiple />
        <TextAreaInput title="توضیحات تصاویر میانی" />
        <TextAreaInput title="توضیحات بخش پروژه ها" />
        <TextAreaInput title="توضیحات درباره ما" />
        <TextAreaInput title="توضیحات سمن ها" />
        <div className="flex gap-2 mt-2">
          <Button>ثبت</Button>
          <Button variant="outline">انصراف</Button>
        </div>
      </div>
    </div>
  );
}

export default ContentHome;
