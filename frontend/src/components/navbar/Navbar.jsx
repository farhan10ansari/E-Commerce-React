import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Navigationbar = ({ name, username, usertype ,logout}) => {
  // console.log(usertype)

  const navigate = useNavigate();

  // console.log(name);



  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="px-3">
      <Container fluid>
        <Navbar.Brand>Welcome {name}</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Nav>
          <Nav>
            {usertype == "user" ? (
              <>
                <Link to="/cart">
                  <Button className="mx-1" variant="danger">
                    Cart
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button variant="info" className="mx-1">
                    MyOrders
                  </Button>
                </Link>
              </>
            ) : usertype == "seller" ? (
              <>
                <Link to="/orders">
                  <Button variant="info" className="mx-1">
                    Orders
                  </Button>
                </Link>
                <Link to="/addProduct">
                  <Button variant="warning" className="mx-1">
                    AddProducts
                  </Button>
                </Link>
              </>
            ) : usertype == "admin" ? (
              <>
                <Link to="/addProduct">
                <Button variant="warning" className="mx-1">
                  AddProducts
                </Button>
                </Link>
              </>
            ) : (
              <></>
            )}
            <Link className="nav-link mx-1" to="/changePassword">
              ChangePassword
            </Link>
            <Nav.Link className="mx-1" onClick={logout}>
              Logout
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
