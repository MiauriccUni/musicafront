import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface PostResponse{
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    telephone: string
    rol: string;
}

export default function Register(){
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmpass, setConfirmpass] = useState<string>("");
    const [telephone, setTelephone] = useState("");
   

    const signin = async () => {
        try{
            if (!name || !lastName || !email || !password || !telephone){
                Swal.fire({
                    title: "Error",
                    text: "Por favor, completa todos los campos.",
                    icon: "error",
                    confirmButtonText: "Intentar de nuevo",
                });

                return;
            }

            if (confirmpass != password){
                Swal.fire({
                    title: "Error",
                    text: "La contraseña debe ser igual en ambos campos.",
                    icon: "error",
                    confirmButtonText: "Intentar de nuevo",
                });
                return;
            }
            const response = await axios.post<PostResponse>(
                "http://localhost:8080/Music/User",
                {
                    name,
                    lastName,
                    email,
                    password,
                    telephone,
                    rol: 2001,
                }
            );
           
            await axios.post<string>(
                `http://localhost:8080/Music/Subscription/assign-subscription?user_id=${response.data.id}&subscription_id=${1}`
            );

            Swal.fire({
                title: "Usuario Registrado!",
                text: "Ahora puedes iniciar sesión",
                icon: "success",
                confirmButtonText: "Continuar",
            });       
        }catch(err){
            Swal.fire({
                title:"Error",
                text: "Error en el servidor",
                icon: "error",
                confirmButtonText:"Intentar de Nuevo",
            });
        };

       

        clean();
        
    }

     const clean = () => {
            setName("");
            setName("");
            setLastName("");
            setEmail("");
            setConfirmpass("");
            setPassword("");
            setTelephone("");
        }


    return(
        <div style={{padding:"2rm"}}>
            <h2>Registro</h2>
            <div style={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center"
            }}>
                
                <input type="text"
                placeholder="Nombre"
                onChange={(e)=> setName(e.target.value)}
                value={name}
                style={{ display: "block", margin: "1rem 0" }}
                />
                <input type="text"
                placeholder="Apellido"
                onChange={(e)=> setLastName(e.target.value)}
                value={lastName}
                style={{ display: "block", margin: "1rem 0" }}
                />
                <input type="email"
                placeholder="Correo"
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                style={{ display: "block", margin: "1rem 0" }}
                />
                
                <input type="password"
                placeholder="Contraseña"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                style={{ display: "block", margin: "1rem 0" }}
                />
                <input type="password"
                placeholder="Confirma la contraseña"
                onChange={(e)=> setConfirmpass(e.target.value)}
                value={confirmpass}
                style={{ display: "block", margin: "1rem 0" }}
                />
                <input type="number"
                placeholder="Telefono"
                onChange={(e)=> setTelephone(e.target.value)}
                value={telephone}
                style={{ display: "block", margin: "1rem 0" }}
                />
                <button onClick={signin}>Registrar</button>

            </div>
        </div>
    )
}