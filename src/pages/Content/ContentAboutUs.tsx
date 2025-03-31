import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

function ContentAboutUs() {
  return (
    <div>
      <PageMeta
        title="محتوا | درباه ما"
        description="محتوای صفحه درباه ما سایت"
      />
      <PageBreadcrumb pageTitle="محتوا" subMenu="درباه ما" />
      <div className="flex flex-col gap-2">
        <ComponentCard title="محتوای درباره ما">
          <TextAreaInput title="توضیحات سرتیتر" />
          <div>
            <Label htmlFor="input">عنوان</Label>
            <Input type="text" id="input" />
          </div>
          {/* <AreaIn */}
          <div>
            <Label>توضیحات</Label>
            <TextArea
              // value={message}
              // onChange={(value) => setMessage(value)}
              rows={6}
            />
          </div>
          <DropzoneComponent title="تصاویر" multiple />
          <div>
            <Label>ماموریت و اهداف</Label>
            <TextArea
              // value={message}
              // onChange={(value) => setMessage(value)}
              rows={6}
            />
          </div>
          <DropzoneComponent title="تصویر بخش مامورت و اهداف" multiple />
        </ComponentCard>
        <div className="flex gap-2 mt-2">
          <Button>ثبت</Button>
          <Button variant="outline">انصراف</Button>
        </div>
      </div>
    </div>
  );
}

export default ContentAboutUs;
