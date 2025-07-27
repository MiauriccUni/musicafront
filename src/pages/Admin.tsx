import * as UserNav from "../components/UserNav";
import GridUsers from "../components/GridUsers";

export default function Admin() {
    return (
        <div>
            <UserNav.NavBar />
            <h1>Pagina del Administrador</h1>
            <div>
                <GridUsers/>
            </div>
        </div>
    );
}
