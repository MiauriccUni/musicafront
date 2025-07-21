import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

            if (rol === 2000) {
                navigate("/admin");
            } else if (rol === 2001) {
                navigate("/client");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError("Invalid credentials or server error.");
            console.error("Login failed:", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
