import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Admin from "../pages/Admin";
import User from "../pages/User";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;
