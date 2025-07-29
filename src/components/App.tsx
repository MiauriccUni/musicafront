import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Admin from "../pages/Admin";
import User from "../pages/User";
import Usersadmin from "../pages/Usersadmin"
import AdminSubs from "../pages/AdminSubs";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
                <Route path= "/usersadmin" element={<Usersadmin/>}/>
                <Route path= "/adminsubs" element={<AdminSubs/>}/>
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;
