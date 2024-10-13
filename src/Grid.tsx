import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColumnApi, ColDef } from "ag-grid-community";
import { fetchData, fetchLargeData, Athlete } from "./api";
import { CustomSelectEditor } from "./CustomSelectEditor";

const columnDefs: ColDef[] = [
  {
    headerName: "ID",
    field: "id",
    width: 70,
  },
  {
    headerName: "Athlete",
    field: "athlete",
    width: 150,
    editable: true,
  },
  {
    headerName: "Age",
    field: "age",
    width: 90,
    minWidth: 50,
    maxWidth: 100,
    editable: true,
    cellEditor: "agRichSelectCellEditor",
    suppressKeyboardEvent: true,
    cellEditorParams: {
      values: [23, 27, 19, 26],
      searchType: "matchAny",
      allowTyping: true,
      filterList: true,
      highlightMatch: true,
      valueListMaxHeight: 220,
    },
  },
  {
    headerName: "Country",
    field: "country",
    width: 120,
    editable: true,
    cellEditorFramework: CustomSelectEditor,
    cellEditorParams: {
      options: ["Russia", "United States", "Canada", "China"],
    },
  },
  {
    headerName: "Year",
    field: "year",
    width: 90,
    editable: true,
    cellEditor: "agRichSelectCellEditor",
    suppressKeyboardEvent: true,
    cellEditorParams: {
      values: [2008, 2004, 2000, 2012],
      searchType: "matchAny",
      allowTyping: true,
      filterList: true,
      highlightMatch: true,
      valueListMaxHeight: 220,
    },
  },
  {
    headerName: "Date",
    field: "date",
    width: 110,
  },
  {
    headerName: "Sport",
    field: "sport",
    width: 110,
  },
  {
    headerName: "Gold",
    field: "gold",
    width: 100,
  },
  {
    headerName: "Silver",
    field: "silver",
    width: 100,
  },
  {
    headerName: "Bronze",
    field: "bronze",
    width: 100,
  },
  {
    headerName: "Total",
    field: "total",
    width: 100,
  },
];

type AgGridApi = {
  grid?: GridApi;
  column?: ColumnApi;
};

function Grid() {
  const [rowData, setRowData] = React.useState<Athlete[]>([]);
  const apiRef = React.useRef<AgGridApi>({
    grid: undefined,
    column: undefined,
  });
  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi;
  };

  React.useEffect(() => {
    fetchData().then((d) => setRowData(d));
    // fetchLargeData().then((d) => setRowData(d));
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      <div
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-balham"
      >
        <AgGridReact
          rowSelection="single"
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          frameworkComponents={{
            customSelectEditor: CustomSelectEditor,
          }}
          rowData={rowData}
          editType={"fullRow"}
        />
      </div>
    </div>
  );
}

export default Grid;
