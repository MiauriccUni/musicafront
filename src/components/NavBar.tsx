import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

export function NavBar() {
    return (
        <Navbar expand="lg" bg="light" sticky="top" className="mb-3">
            <Container fluid>
                <Navbar.Brand className="text-center bold">Musica</Navbar.Brand>
            </Container>
        </Navbar>
    );
}
