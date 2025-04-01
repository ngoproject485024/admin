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
import CreateEducation from "./CreateEducation";
import { useQuery } from "@tanstack/react-query";
import { getEducations } from "../../server/education";
import Button from "../ui/button/Button";
import { TrashBinIcon } from "../../icons";

ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
  peTitle: string;
  enTitle: string;
  ruTitle: string;
  peDescription: string;
  enDescription: string;
  ruDescription: string;
  peEducationBody: string;
  enEducationBody: string;
  ruEducationBody: string;
  actions: string;
}

const themeDark = themeAlpine.withPart(colorSchemeDarkBlue);
const themeLight = themeAlpine.withPart(colorSchemeLight);

function EducationList() {
  const { data, refetch } = useQuery({
    queryKey: ["getEducations"],
    queryFn: getEducations,
  });

  console.log(data);

  const [colDefs] = useState<ColDef<IRow>[]>([
    { field: "peTitle", headerName: "عنوان فارسی" },
    { field: "enTitle", headerName: "عنوان انگلیسی" },
    { field: "ruTitle", headerName: "عنوان روسی" },
    { field: "peDescription", headerName: "توضیحات فارسی" },
    { field: "enDescription", headerName: "توضیحات انگلیسی" },
    { field: "ruDescription", headerName: "توضیحات روسی" },
    { field: "peEducationBody", headerName: "توضیحات تکمیلی فارسی" },
    { field: "enEducationBody", headerName: "توضیحات تکمیلی انگلیسی" },
    { field: "ruEducationBody", headerName: "توضیحات تکمیلی روسی" },
    {
      field: "actions",
      headerName: "عملیات",
      cellRenderer: () => (
        <Button
          variant="primary"
          className="bg-rose-500 hover:bg-rose-800"
          size="sm"
          startIcon={<TrashBinIcon />}
        >
          حذف
        </Button>
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
        <CreateEducation refetch={refetch} />
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
    </>
  );
}

export default EducationList;
