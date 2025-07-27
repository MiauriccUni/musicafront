import Container from "react-bootstrap/Container";
import Logout from "./Logout";
import Navbar from "react-bootstrap/Navbar";


export function NavBar() {

    const email =localStorage.getItem("email");


    return (
        <Navbar expand="lg" bg="light" sticky="top" className="mb-3">
            <Container style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Navbar.Brand className="text-center bold">
                    Disfruta la Musica
                </Navbar.Brand>
                <div>
                    <Logout />
                    <p>{email}</p>
                </div>
            </Container>
        </Navbar>
    );
}
