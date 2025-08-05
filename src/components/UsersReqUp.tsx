import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface GetResponse {
  id: number;
  name: string;
  lastName: string;
  email: string;
  telephone: string;
  rol: string;
  subscription: sub;
}

interface sub {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function UsersReqUp() {
  const email1 = localStorage.getItem("email");

  const [rowData, setRowData] = useState<GetResponse | null>(null);

  useEffect(() => {
    axios
      .get<GetResponse>(`http://localhost:8080/Music/User/by-email/${email1}`)
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [confirmpass, setConfirmpass] = useState<string>("");
  const [telephone, setTelephone] = useState("");

  const up = async () => {
    try {
      if (
        !name ||
        !lastName ||
        !email ||
        !password ||
        !confirmpass ||
        !telephone
      ) {
        Swal.fire({
          title: "Error",
          text: "Por favor, completa todos los campos.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
        return;
      }

      if (confirmpass != password) {
        Swal.fire({
          title: "Error",
          text: "La contraseña debe ser igual en ambos campos.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
        return;
      }

      await axios.post<GetResponse>(
        "http://localhost:8080/Music/User",
        {
          id: rowData?.id,
          name,
          lastName,
          email,
          password,
          telephone,
          rol: rowData?.rol,
          subscription: {
            id: rowData?.subscription.id,
            name: rowData?.subscription.name,
            pice: rowData?.subscription.price,
            description: rowData?.subscription.description,
          }
        }
      );

      Swal.fire({
        title: "Usuario Actualizado!",
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } catch(err) {
      Swal.fire({
        title: "Error ",
        text: "Error en el servidor" + err,
        icon: "error",
        confirmButtonText: "Intentar de Nuevo",
      });
    }
    
    useEffect(() => {
    axios
      .get<GetResponse>(`http://localhost:8080/Music/User/by-email/${email1}`)
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  };

  return (
    <div>
      <h2>Actualizar Perfil</h2>
      {rowData && (
        <form
          style={{
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label>
            Nombre: {rowData.name}
            <input
              type="text"
              placeholder="Nombre"
              style={{ display: "block", margin: "1rem 0" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Apellido: {rowData.lastName}
            <input
              type="text"
              placeholder="Apellido"
              style={{ display: "block", margin: "1rem 0" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email: {rowData.email}
            <input
              type="email"
              placeholder="Correo"
              style={{ display: "block", margin: "1rem 0" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              placeholder="Contraseña"
              style={{ display: "block", margin: "1rem 0" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Confirmar contraseña:
            <input
              type="password"
              placeholder="Confirmar contraseña"
              style={{ display: "block", margin: "1rem 0" }}
              value={confirmpass}
              onChange={(e) => setConfirmpass(e.target.value)}
            />
          </label>
          <label>
            Teléfono: {rowData.telephone}
            <input
              type="text"
              placeholder="Telefono"
              style={{ display: "block", margin: "1rem 0" }}
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </label>
          <label>Suscripción: {rowData.subscription.name}</label>
        </form>
      )}
      <div style={{
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
          }}>
         <button style={{ display: "block", margin: "1rem 0" }} onClick={up}>Actualizar Perfil</button>
      </div>
    </div>
  );
}
