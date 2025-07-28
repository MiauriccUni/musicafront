import Container from "react-bootstrap/Container";
import Logout from "./Logout";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const home = localStorage.getItem("rol");

  function redir() {
    if (home == "2000") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  }

  return (
    <Navbar expand="lg" bg="light" sticky="top" className="mb-3">
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Navbar.Brand className="text-center bold" >
          <button onClick={redir}
          >Administración de Usuarios</button>
        </Navbar.Brand>
        <div>
          <Logout />
          <p>{email}</p>
        </div>
      </Container>
    </Navbar>
  );
}
