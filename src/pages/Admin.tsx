import * as UserNav from "../components/UserNav";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const navigate = useNavigate();

    function adminsUsers() {
        navigate("/Usersadmin");
    }

    function adminSubs() {
        navigate("/AdminSubs");
    }
    
    return (
        <div>
            <UserNav.NavBar />
            <h1>Pagina del Administrador</h1>
            <div>
                <button 
                 onClick={adminsUsers}>Administración de Usuarios</button>
            </div>
            <div>
                <button 
                 onClick={adminSubs}>Administración de Subscripciones</button>
            </div>
        </div>
    );
}
