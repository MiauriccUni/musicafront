import { useEffect, useState } from "react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
ModuleRegistry.registerModules([  AllCommunityModule ]);


interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  telephone: string;
  rol: string;
  subscription: Sub; // Nested subscription object
}

interface Sub {
  id: number;
  name: string;
  price: number;
  description: string;
}

const columnDefs: ColDef[]= [
  {headerName: "ID", field: "id"},
  {headerName: "Nombre", field: "name"},
  {headerName: "Correo", field: "email"},
  {headerName: "Subscripción ID", valueGetter: params => params.data.subscription?.id ??"Sin subscripción" },
  {headerName: "Nombre de la Subscripción", valueGetter: params => params.data.subscription?.name ?? "Sin subscripción" },
  {headerName: "Precio de la Subscripción", valueGetter: params => params.data.subscription?.price ?? "Sin subscripción" },
  {headerName: "Descripción de la Subscripción", valueGetter: params => params.data.subscription?.description ?? "Sin subscripción" },
]

export default function AdminUserSub(){


  const [rowData, setRowData] = useState<User[]>([]);

  useEffect(()=>{

    axios
    .get<User[]>("http://localhost:8080/Music/User")
    .then((response)=>{
      setRowData(response.data);
    })
    .catch((error)=>{
      console.error("error ", error)
    });
  },[]);

  return(
    <div>
      <h2>Usuarios y su subscripción</h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData}/>
      </div>
    </div>
  )

}