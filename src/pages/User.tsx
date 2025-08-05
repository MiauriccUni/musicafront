import * as UserNav from "../components/UserNav";
import UsersReqUp from "../components/UsersReqUp";
import UserSubUpdat from "../components/UserSubUpdat";

export default function User() {
    return (
        <div>
            <UserNav.NavBar />
            <h1>Pagina del Usuario</h1>
            <div>
                <UsersReqUp/>
            </div>
        </div>
    );
}
