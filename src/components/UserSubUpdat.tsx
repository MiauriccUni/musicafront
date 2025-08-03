import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserSubUpdat() {
  const [userid, setUsserId] = useState<number>();
  const [subid, setSubId] = useState<number>();

  const updateSub = async () => {
    try{

      if(!userid || !subid){
        Swal.fire({
          title: "Error",
          text: "Por favor, completa todos los campos.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
        return;
      }

      await axios.post<string>(
      "http://localhost:8080/Music/Subscription/assign-subscription?user_id=" +
        userid +
        "&subscription_id=" +
        subid
    );
    Swal.fire({
            title: "Usuario modificado!",
            icon: "success",
            confirmButtonText: "Continuar",
          });
    }catch(err){
      Swal.fire({
        title: "Error",
        text: "Error en el servidor",
        icon: "error",
        confirmButtonText: "Intentar de Nuevo",
      });
    }
  };
  return(
    <div>
      <h2>Actualizar la subscripcion del Usuario</h2>
      <div style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}>

          <input
          type="number"
          placeholder="Id del Usuario"
          onChange={(e) => setUsserId(e.target.valueAsNumber)}
          value={userid}
          style={{ display: "block", margin: "1rem 0" }}
        />

        <input
          type="number"
          placeholder="Id de la Subscripción"
          onChange={(e) => setSubId(e.target.valueAsNumber)}
          value={subid}
          style={{ display: "block", margin: "1rem 0" }}
        />
        <button onClick={updateSub}>Registrar</button>
      </div>
    </div>
  )
}
