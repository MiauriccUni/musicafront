import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface PostResponse {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function RegisterSubs() {

  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const registerSub = async () => {
    try {
      if (!name || !price || !description) {
        Swal.fire({
          title: "Error",
          text: "Por favor, completa todos los campos.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
        return;
      }

      const response = await axios.post<PostResponse>(
        "http://localhost:8080/Music/Subscription",
        {
          id,
          name,
          price,
          description,
        }
      );
      Swal.fire({
        title: "Subscripción Registrada!",
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Error en el servidor",
        icon: "error",
        confirmButtonText: "Intentar de Nuevo",
      });
      clean();
    }
  };
  const clean = () => {
    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <div
      style={{
        padding: "2rm",
        display: "grid ",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <h2>Registro de Subs</h2>
      <input
        type="number"
        placeholder="ID"
        onChange={(e) => setId(e.target.valueAsNumber)}
        value={id}
        style={{ display: "block", margin: "1rem 0" }}
      />
      <input
        type="text"
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
        value={name}
        style={{ display: "block", margin: "1rem 0" }}
      />
      <input
        type="number"
        placeholder="Precio"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        style={{ display: "block", margin: "1rem 0" }}
      />
      <input
        type="text"
        placeholder="Descripción"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        style={{ display: "block", margin: "1rem 0" }}
      />
      <button onClick={registerSub}>Registrar</button>
    
    </div>
  );
}
