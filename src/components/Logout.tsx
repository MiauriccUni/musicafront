import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "¿De verdad quieres salir?",
            text: "Se cerrara la sesion.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, desconectar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("rol");
                Swal.fire(
                    "¡Desconectado!",
                    "Has cerrado sesión correctamente.",
                    "success"
                );
                navigate("/");
            }
        });
    };

    return (
        <button onClick={handleLogout} style={{ margin: "1rem" }}>
            Logout
        </button>
    );
}
