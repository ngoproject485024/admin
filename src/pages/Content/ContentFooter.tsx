import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

const ContentFooter = () => {
  return (
    <div>
      <PageMeta title="محتوا | فوتر" description="محتوای صفحه فوتر" />
      <PageBreadcrumb pageTitle="محتوا" subMenu="فوتر" />
      <div className="flex flex-col gap-2">
        <ComponentCard title="اطلاعات فوتر">
          <div>
            <Label>توضیحات</Label>
            <TextArea
              // value={message}
              // onChange={(value) => setMessage(value)}
              rows={6}
            />
          </div>
          <div>
            <Label htmlFor="input">ایمیل</Label>
            <Input type="text" id="input" />
          </div>
          <div>
            <Label htmlFor="input">تلفن</Label>
            <Input type="text" id="input" />
          </div>
          <div>
            <Label htmlFor="input">اینستاگرام</Label>
            <Input type="text" id="input" />
          </div>
          <div>
            <Label htmlFor="input">لینکدین</Label>
            <Input type="text" id="input" />
          </div>
          <div>
            <Label htmlFor="input">ایکس</Label>
            <Input type="text" id="input" />
          </div>
          <div>
            <Label htmlFor="input">فیس بوک</Label>
            <Input type="text" id="input" />
          </div>
        </ComponentCard>
        <div className="flex gap-2 mt-2">
          <Button>ثبت</Button>
          <Button variant="outline">انصراف</Button>
        </div>
      </div>
    </div>
  );
};

export default ContentFooter;
