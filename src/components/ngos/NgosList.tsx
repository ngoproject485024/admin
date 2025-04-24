import { useMutation, useQuery } from "@tanstack/react-query";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  AllCommunityModule,
  ColDef,
  colorSchemeDarkBlue,
  colorSchemeLight,
  ModuleRegistry,
  themeAlpine,
} from "ag-grid-community";
import { useTheme } from "../../context/ThemeContext";
import Input from "../form/input/InputField";
import { AG_GRID_LOCALE_IR } from "@ag-grid-community/locale";
import Confirm from "../confirm";
import { enableAndDisableNgo, getNgos } from "../../server/ngos";
import { Link } from "react-router";
import Button from "../ui/button/Button";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  logo: string;
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  postal: string;
  projects: [];
  website: string;
  disable: boolean;
  details: any;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function NgosList() {
  const [isOpenDisableAndEnable, setIsOpenDisableAndEnable] =
    useState<string>("");

  const handleCloseConfirm = () => setIsOpenDisableAndEnable("");

  const mutation = useMutation({
    mutationKey: ["enableAndDisableNgo"],
    mutationFn: enableAndDisableNgo,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("سمن با موفقیت فعال/غیرفعال شد");
        refetch();
        handleCloseConfirm();
      } else {
        toast.error("عملیات ناموفق ، لطفا دوباره امتحان کنید");
        handleCloseConfirm();
      }
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getNgos"],
    queryFn: getNgos,
  });

  const [colDefs] = useState<ColDef<IRow>[]>([
    {
      field: "logo",
      headerName: "نشان",
      width: 100,
      cellRenderer: (params: any) => (
        <img src={params.value} alt="logo" className="rounded-full w-10 h-10" />
      ),
    },
    { field: "name", headerName: "نام سمن" },
    { field: "city", headerName: "شهر" },
    { field: "country", headerName: "کشور" },
    { field: "address", headerName: "آدرس" },
    { field: "phone", headerName: "تلفن" },
    { field: "postal", headerName: "کد پستی" },
    {
      field: "disable",
      width: 150,
      headerName: "فعال/غیرفعال",
      cellRenderer: (params: any) => {
        console.log("ppp", params.value);
        return (
          <div className="checkbox-wrapper-14 mt-4">
            <input
              id="s1-14"
              type="checkbox"
              className="switch"
              defaultChecked={!params?.value}
              checked={!params?.value}
              onChange={() => {
                setIsOpenDisableAndEnable(params.data?._id);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "details",
      headerName: "جزئیات",
      width: 100,
      cellRenderer: (params: any) => {
        return (
          <Link
            to={{
              pathname: `/ngos/manage-ngos/${params?.data?._id}`,
            }}
          >
            <Button size="sm">جزئیات</Button>
          </Link>
        );
      },
    },
  ]);

  const defaultColDef: ColDef = {
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    headerStyle: {
      textAlign: "center",
    },
    headerClass: "header-cell",
    filter: true,
    spanRows: true,
    sortable: true,
    resizable: true,
  };

  const gridRef = useRef<AgGridReact>(null);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);

  const { theme } = useTheme();

  return (
    <>
      <div className="my-4 flex gap-4">
        <Input
          type="text"
          id="filter-text-box"
          placeholder="جستجو..."
          onInput={onFilterTextBoxChanged}
        />
      </div>
      <div style={{ width: "100%", height: "450px" }}>
        <AgGridReact
          ref={gridRef}
          theme={theme === "dark" ? themeDark : themeLight}
          enableRtl
          pagination
          localeText={AG_GRID_LOCALE_IR}
          rowData={data && data.data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>

      <Confirm
        isOpen={!!isOpenDisableAndEnable}
        onClose={handleCloseConfirm}
        isLoading={mutation.isPending}
        onSubmit={() => mutation.mutate(isOpenDisableAndEnable)}
        message="آیا میخواهید این سمن را فعال/غیرفعال کنید؟"
      />
    </>
  );
}

export default NgosList;
