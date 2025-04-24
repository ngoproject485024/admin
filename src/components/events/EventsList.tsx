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
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../form/input/InputField";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/button/Button";
import { TrashBinIcon, UpdateIcon } from "../../icons";
import CreateEvent from "./CreateEvent";
import { deleteEvent, getEvents } from "../../server/events";
import Confirm from "../confirm";
import UpdateEvent from "./UpdateEvent";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  peDescription: string;
  enDescription: string;
  ruDescription: string;
  peEventsBody: string;
  enEventsBody: string;
  ruEventsBody: string;
  actions: string;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function EventsList() {
  const [isOpenDel, setIsOpenDel] = useState<string>("");
  const [isOpenUp, setIsOpenUp] = useState<string>("");
  const [updateValues, setUpdateValues] = useState<any>({});

  const handleCloseConfirm = () => setIsOpenDel("");
  const handleCloseUp = () => setIsOpenUp("");

  const mutation = useMutation({
    mutationKey: ["deleteEvent"],
    mutationFn: deleteEvent,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("رویداد با موفقیت حذف شد");
        refetch();
        handleCloseConfirm();
      } else {
        toast.error("رویداد حذف نشد ، لطفا دوباره امتحان کنید");
        handleCloseConfirm();
      }
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["getEvents"],
    queryFn: getEvents,
  });

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "peTitle", headerName: "عنوان فارسی" },
    { field: "enTitle", headerName: "عنوان انگلیسی" },
    { field: "ruTitle", headerName: "عنوان روسی" },
    { field: "peDescription", headerName: "توضیحات فارسی" },
    { field: "enDescription", headerName: "توضیحات انگلیسی" },
    { field: "ruDescription", headerName: "توضیحات روسی" },
    { field: "peEventsBody", headerName: "توضیحات تکمیلی فارسی" },
    { field: "enEventsBody", headerName: "توضیحات تکمیلی انگلیسی" },
    { field: "ruEventsBody", headerName: "توضیحات تکمیلی روسی" },
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
        <CreateEvent refetch={refetch} />
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
        message="آیا میخواهید آموزش را حذف کنید؟"
      />

      <UpdateEvent
        isOpen={isOpenUp}
        onClose={handleCloseUp}
        refetch={refetch}
        data={updateValues}
      />
    </>
  );
}

export default EventsList;
