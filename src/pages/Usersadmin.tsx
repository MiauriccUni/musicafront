import * as UserNav from "../components/UserNav";
import GridUsers from "../components/GridUsers";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Usersadmin() {
  let [id, setId] = useState<number>();

  const del = async () => {
    try {
      if (!id) {
        Swal.fire({
          title: "Error",
          text: "Por favor indica el Id a eliminar.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
      }
      const response = await axios.delete<string>(
        "http://localhost:8080/Music/User/" + id,
        {
          data: { id },
        }
      );
      const messager = response.data;
      Swal.fire({
        title: messager,
        text: "Usuario eliminado",
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "El id Indicado no existe",
        icon: "error",
        confirmButtonText: "Intentar de Nuevo",
      });
    }
  };

  return (
    <div>
      <UserNav.NavBar />
      <GridUsers />
      <div>
        <input
          type="number"
          placeholder="Id a eliminar"
          onChange={(e) => setId(e.target.valueAsNumber)}
          value={id}
          style={{ display: "block", margin: "1rem 0" }}
        ></input>
        <button onClick={del}>Eliminar</button>
      </div>
    </div>
  );
}
