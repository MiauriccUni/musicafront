import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([  AllCommunityModule ]);


interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  telephone: string;
  rol: string;
}

const columnDefs: ColDef[] = [
   {headerName: "ID", field: "id" },
  { headerName: "Nombre", field: "name" },
  { headerName: "Apellidos", field: "lastName" },
  { headerName: "Correo", field: "email" },
  { headerName: "Telefono/Celular", field: "telephone" },
  { headerName: "Rol", field: "rol" },
] as const;

const GridUsers = () => {
  const [rowData, setRowData] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:8080/Music/User")
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};

export default GridUsers;
