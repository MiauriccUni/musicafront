import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import * as UserNav from "../components/UserNav";
import RegisterSubs from "../components/RegisterSubs";
import Deletesubs from "../components/DeleteSubs";
ModuleRegistry.registerModules([  AllCommunityModule ]);

interface sub {
    id: number;
    name: string;
    price: number;
    description: string;
}

const columnDefs: ColDef[] =[
    {headerName: "ID", field: "id" },
  { headerName: "Nombre", field: "name" },
  { headerName: "Precio", field: "price" },
  { headerName: "Descripción", field: "description" },
]

export default function AdminSubs(){

    const [rowData, setRowData] = useState<sub[]>([]);

    useEffect(()=>{
        axios
        .get<sub[]>("http://localhost:8080/Music/Subscription")
        .then((response)=>{
            setRowData(response.data);
        })
        .catch((error)=>{
            console.log("error", error)
        });
    },[]);

    return(
        <div>
            <div>
            <UserNav.NavBar />
            <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                <AgGridReact columnDefs={columnDefs} rowData={rowData} />
            </div>
            <RegisterSubs/>
            </div>
            <div>
                <Deletesubs/>
            </div>
        </div>
    )
}