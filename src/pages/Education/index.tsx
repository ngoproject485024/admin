import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import EducationList from "../../components/education/EducationLists";

function EducationPage() {
  return (
    <div>
      <PageMeta title="آموزش " description="آموزش" />
      <PageBreadcrumb pageTitle="آموزش" subMenu="لیست آموزش ها" />
      <EducationList />
    </div>
  );
}

export default EducationPage;
