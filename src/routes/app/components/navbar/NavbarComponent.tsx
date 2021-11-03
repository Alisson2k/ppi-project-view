import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import ShopCart from "../shop-cart/ShopCart";

export const NavbarComponent: React.FC<{}> = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const history = useHistory();

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand onClick={() => history.push(`/app`)}>Projeto</Navbar.Brand>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown title="Menu" id="basic">
              <NavDropdown.Item onClick={() => history.push(`/products`)}>Produtos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text className="justify-content-end">
          <AiOutlineShoppingCart
            onClick={openCart}
            style={{ fontSize: "26px", cursor: "pointer" }}
          />
        </Navbar.Text>
        <ShopCart show={showCart} onClose={closeCart} />
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
