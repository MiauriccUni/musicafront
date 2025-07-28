import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Register from "./Register";
import { NavBar } from "./NavBar";

interface AuthResponse {
    token: string;
    name: string;
    email: string;
    rol: 2000 | 2001;
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                Swal.fire({
                    title: "Error",
                    text: "Por favor, completa todos los campos.",
                    icon: "error",
                    confirmButtonText: "Intentar de nuevo",
                });
                return;
            }
            const response = await axios.post<AuthResponse>(
                "http://localhost:8080/auth/login",
                {
                    email,
                    password,
                }
            );

            const { token, rol } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("rol", rol.toString());
            localStorage.setItem("email",email.toString());

            Swal.fire({
                title: "Correcto!!",
                text: "Has iniciado sesión correctamente.",
                icon: "success",
                confirmButtonText: "Continuar",
            }).then(() => {
                if (rol == 2000) {
                    navigate("/admin");
                } else if (rol == 2001) {
                    navigate("/user");
                } else {
                    navigate("/");
                }
            });
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: "Credenciales inválidas",
                icon: "error",
                confirmButtonText: "Intentar de nuevo",
            });
        }
        clean();
    };

    const clean = () => {
        setEmail("");
        setPassword("");
    }

    return (
    
        <div style={{ padding: "2rem" }}>
            <div>
                <NavBar/>
            </div>
            <h2>Por favor inicia sesión</h2>
            <div style={{
                display: "grid",
                justifyContent: "center",
                alignItems:'center'
            }}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    style={{ display: "block", margin: "1rem 0" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    style={{ display: "block", margin: "1rem 0" }}
                />
                <button onClick={handleLogin}>Ingresar</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <Register/>
                </div>
            </div>
        </div>
    );
}
