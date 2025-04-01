import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { getCookie } from "../utils/cookie";
import { useEffect, useState } from "react";
import Loading from "../components/loading";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getCookie("admin-miras-token");

    if (cookie) {
      navigate("/", { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
    setIsDisplay(true);
  }, []);

  if (!isDisplay) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:mr-[290px]" : "lg:mr-[90px]"
        } ${isMobileOpen ? "mr-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
