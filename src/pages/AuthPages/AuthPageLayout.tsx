import React, { useEffect } from "react";
import GridShape from "../../components/common/GridShape";
import { Link, useNavigate } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import { getCookie } from "../../utils/cookie";
import Loading from "../../components/loading";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDisplay, setIsDisplay] = React.useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getCookie("admin-miras-token");

    if (cookie) {
      navigate("/", { replace: true });
    } else {
      setIsDisplay(true);
    }
  }, []);

  if (!isDisplay) {
    return <Loading />;
  }

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/logo.jpg"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                سامانه مدیریت سایت مرکز مطالعات منطقه ای پاسداری از میراث فرهنگی
                ناملموس در آسیای غربی و مرکزی تحت نظارت یونسکو
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
