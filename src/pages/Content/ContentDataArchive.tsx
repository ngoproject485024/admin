import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TextArea from "../../components/form/input/TextArea";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";

function ContentDataArchive() {
  return (
    <div>
      <PageMeta
        title="محتوا | آرشیو دیجیتال"
        description="محتوای صفحه آرشیو دیجیتال"
      />
      <PageBreadcrumb pageTitle="محتوا" subMenu="آرشیو دیجیتال" />
      <div className="flex flex-col gap-2">
        <ComponentCard title="توضیحات آرشیو دیجیتال">
          <div>
            <Label>توضیحات</Label>
            <TextArea
              // value={message}
              // onChange={(value) => setMessage(value)}
              rows={6}
            />
          </div>
        </ComponentCard>
        <div className="flex gap-2 mt-2">
          <Button>ثبت</Button>
          <Button variant="outline">انصراف</Button>
        </div>
      </div>
    </div>
  );
}

export default ContentDataArchive;
