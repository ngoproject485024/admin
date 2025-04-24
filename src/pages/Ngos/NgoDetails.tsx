import { useParams } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useQuery } from "@tanstack/react-query";
import { getSpecificNgo } from "../../server/ngos";
import Loading from "../../components/loading";
import ComponentCard from "../../components/common/ComponentCard";

function NgoDetails() {
  const params = useParams<{ id?: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["getSpecificNgo", params.id],
    queryFn: () => getSpecificNgo(params?.id || ""),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageMeta title="سمن ها " description=" جزئیات سمن" />
      <PageBreadcrumb
        pageTitle="سمن ها"
        subMenu="مدیریت سمن ها"
        subTwoMenu="جزئیات سمن"
      />
      <div className="flex justify-center py-10">
        <img
          src={data?.data?.ngo?.logo}
          alt="logo"
          className="max-w-2/3 object-contain rounded-full"
          loading="lazy"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <ComponentCard title="نام سمن">
          <span className="dark:text-white">{data?.data?.ngo?.name}</span>
        </ComponentCard>
        <ComponentCard title="حوزه فعالیت">
          {data?.data?.ngo?.activityField?.map((item: string) => (
            <span className="dark:text-white">{item} </span>
          ))}
        </ComponentCard>
        <ComponentCard title="آدرس">
          <span className="dark:text-white">{data?.data?.ngo?.address}</span>
        </ComponentCard>
        <ComponentCard title="شهر">
          <span className="dark:text-white">{data?.data?.ngo?.city}</span>
        </ComponentCard>
        <ComponentCard title="کشور">
          <span className="dark:text-white">{data?.data?.ngo?.country}</span>
        </ComponentCard>
        <ComponentCard title="فعال/غیرفعال">
          <span className="dark:text-white">
            {!data?.data?.ngo?.disable ? "غیرفعال" : "فعال"}
          </span>
        </ComponentCard>
        <ComponentCard title="ایمیل">
          <span className="dark:text-white">{data?.data?.ngo?.email}</span>
        </ComponentCard>
        <ComponentCard title="تلفن">
          <span className="dark:text-white">{data?.data?.ngo?.phone}</span>
        </ComponentCard>
        <ComponentCard title="تعداد پروژه">
          <span className="dark:text-white">
            {data?.data?.ngo?.projects?.length}
          </span>
        </ComponentCard>
        <ComponentCard title="وب سایت">
          <span className="dark:text-white">{data?.data?.ngo?.website}</span>
        </ComponentCard>
        {data?.data?.ngo?.socialMedia?.instagram && (
          <ComponentCard title="اینتساگرام">
            <span className="dark:text-white">
              {data?.data?.ngo?.socialMedia?.instagram}
            </span>
          </ComponentCard>
        )}
        {data?.data?.ngo?.socialMedia?.linkedIn && (
          <ComponentCard title="لینکدین">
            <span className="dark:text-white">
              {data?.data?.ngo?.socialMedia?.linkedIn}
            </span>
          </ComponentCard>
        )}
        {data?.data?.ngo?.socialMedia?.telegram && (
          <ComponentCard title="لینکدین">
            <span className="dark:text-white">
              {data?.data?.ngo?.socialMedia?.telegram}
            </span>
          </ComponentCard>
        )}
        {data?.data?.ngo?.socialMedia?.telegram && (
          <ComponentCard title="مدارک" className="col-span-3">
            {data?.data?.ngo?.documentsFile?.map((file: string) => (
              <>
                {file.slice(file.length - 3) === "png" ||
                file.slice(file.length - 3) === "jpg" ||
                file.slice(file.length - 4) === "jpeg" ? (
                  <img
                    alt="file"
                    src={file}
                    className="object-contain"
                    loading="lazy"
                  />
                ) : (
                  <>
                    {file.slice(file.length - 3) === "mp4" ||
                    file.slice(file.length - 4) === "mpeg" ? (
                      <video src={file} controls />
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ))}
          </ComponentCard>
        )}
      </div>
      {/* <NgosList /> */}
    </div>
  );
}

export default NgoDetails;
