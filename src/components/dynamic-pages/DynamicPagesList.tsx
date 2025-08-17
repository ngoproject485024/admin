import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_IR } from "@ag-grid-community/locale";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeAlpine,
  colorSchemeDarkBlue,
  colorSchemeLight,
} from "ag-grid-community";
import Input from "../form/input/InputField";
import { useTheme } from "../../context/ThemeContext";
// import CreateEducation from "./CreateEducation";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../ui/button/Button";
import { TrashBinIcon, UpdateIcon } from "../../icons";
import Confirm from "../confirm";
import toast from "react-hot-toast";
import { deletePage, getAllDynamicPages } from "../../server/dynamic-page";
// import UpdateEducation from "./UpdateEducation";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  path: string;
  hasSubPage: boolean;
  template: number;
  actions: string;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function DynamicPagesList() {
  const [isOpenDel, setIsOpenDel] = useState<string>("");
  const [isOpenUp, setIsOpenUp] = useState<string>("");
  const [updateValues, setUpdateValues] = useState<any>({});

  const handleCloseConfirm = () => setIsOpenDel("");
  const handleCloseUp = () => setIsOpenUp("");

  const mutation = useMutation({
    mutationKey: ["deletePage"],
    mutationFn: deletePage,
    onSuccess: (data: any) => {
      if (data.success) {
        toast.success("صفحه با موفقیت حذف شد");
        refetch();
        handleCloseConfirm();
      } else {
        toast.error(data?.error);
        handleCloseConfirm();
      }
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getAllDynamicPages"],
    queryFn: getAllDynamicPages,
  });

  console.log("cccccc", data);

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "peTitle", headerName: "عنوان فارسی" },
    { field: "enTitle", headerName: "عنوان انگلیسی" },
    { field: "ruTitle", headerName: "عنوان روسی" },
    { field: "path", headerName: "مسیر صفحه" },
    {
      field: "hasSubPage",
      headerName: "مسیر فرعی",
      cellRenderer: (params: { value: boolean }) =>
        params?.value ? "دارد" : "ندارد",
    },
    {
      field: "template",
      headerName: "قالب صفحه",
      cellRenderer: (params: { value: number }) =>
        params?.value === 1 ? "قالب اول" : params?.value === 2 ? "قالب دوم" : "قالب سوم",
    },

    {
      field: "actions",
      headerName: "عملیات",
      cellRenderer: (params: any) => (
        <div className="flex gap-2">
          <Button
            variant="primary"
            className="bg-rose-500 hover:bg-rose-800"
            size="sm"
            startIcon={<TrashBinIcon />}
            onClick={() => {
              setIsOpenDel(params.data._id);
            }}
          >
            حذف
          </Button>
          <Button
            variant="primary"
            className="bg-yellow-400 hover:bg-yellow-500"
            size="sm"
            startIcon={<UpdateIcon />}
            onClick={() => {
              setIsOpenUp(params.data._id);
              setUpdateValues(params.data);
            }}
          >
            به روز رسانی
          </Button>
        </div>
      ),
    },
  ]);

  const defaultColDef: ColDef = {
    cellStyle: {
      diplay: "flex",
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
        {/* <CreateEducation refetch={refetch} /> */}
      </div>
      <div style={{ width: "100%", height: "400px" }}>
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
        isOpen={!!isOpenDel}
        onClose={handleCloseConfirm}
        isLoading={mutation.isPending}
        onSubmit={() => mutation.mutate(isOpenDel)}
        message="آیا میخواهید این صفحه را حذف کنید؟"
      />

      {/* <UpdateEducation
        isOpen={isOpenUp}
        onClose={handleCloseUp}
        refetch={refetch}
        data={updateValues}
      /> */}
    </>
  );
}

export default DynamicPagesList;
