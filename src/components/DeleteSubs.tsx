import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Deletesubs() {
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
        return;
      }
      const response = await axios.delete<string>(
        "http://localhost:8080/Music/Subscription/" + id,
        {
          data: { id },
        }
      );
      const mesager = response.data;

      Swal.fire({
        title: mesager,
        text: "Subscripcion correctamente eliminada",
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
  
  return(
    <div>
     <h2 style={{ padding: "20px" }}>Eliminar Subscripciones</h2>
      <div 
      style={{
        padding: "2rm",
        display: "grid ",
        justifyContent: "center",
        alignContent: "center",
      }}>
        <input
          type="number"
          placeholder="Id"
          onChange={(e) => setId(e.target.valueAsNumber)}
          value={id}
          style={{ display: "block", margin: "1rem 0" }}
        />
        <button onClick={del}>Eliminar</button>
      </div>
      </div>
  )
}
