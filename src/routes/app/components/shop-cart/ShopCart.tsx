import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  Offcanvas,
  Modal,
} from "react-bootstrap";
import { PRODUCTS } from "../../../../constants/products";
import { AiOutlineMinus } from "react-icons/ai";
import { UserContext } from "../../../../contexts/UserContext";
import { ProductsContext } from "../../../../contexts/ProductsContext";
import { postOrder } from "../../../../services/order/order";

import "./ShopCart.scss";

interface ShopCartProps {
  show: boolean;
  onClose: () => void;
}

export const ShopCart: React.FC<ShopCartProps> = (props) => {
  const [address, setAddress] = useState<Address>({});
  const [payment, setPayment] = useState<Payment>({});
  const [buyed, setBuyed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>(1);
  const [disabledAddress, setDisabledAddress] = useState<boolean>(true);
  const [disabledPayment, setDisabledPayment] = useState<boolean>(true);

  const userContext = useContext(UserContext);
  const products = useContext(ProductsContext);

  useEffect(() => {
    setDisabledAddress(
      !(
        address.state !== undefined &&
        address.state !== "" &&
        address.city !== undefined &&
        address.city !== "" &&
        address.street !== undefined &&
        address.street !== "" &&
        address.number !== undefined &&
        address.number !== "" &&
        address.additional !== undefined &&
        address.additional !== ""
      )
    );

    setDisabledPayment(
      !(
        payment.number !== undefined &&
        payment.number !== "" &&
        payment.cvv !== undefined &&
        payment.cvv !== "" &&
        payment.date !== undefined &&
        payment.date !== "" &&
        payment.name !== undefined &&
        payment.name !== ""
      )
    );
  }, [address, payment]);

  const closeModal = () => {
    setBuyed(false);
    props.onClose();
  };

  const changeAddress = (index: any) => {
    if (index == undefined || index == -1) {
      setAddress({
        state: "",
        city: "",
        street: "",
        number: "",
        additional: "",
      });
    } else if (!!userContext.address) {
      setAddress(userContext.address[index]);
    }
  };

  const changePayment = (index: any) => {
    if (index == undefined || index == -1) {
      setPayment({
        number: "",
        cvv: "",
        date: "",
        name: "",
      });
    } else if (!!userContext.payment) {
      setPayment(userContext.payment[index]);
    }
  };

  const removeItem = (index: number) => {
    products.setProducts(products.products.filter((_, i) => i != index));
  };

  const submitOrder = () => {
    postOrder({
      payment,
      address,
      user: userContext,
      product: products.products,
    })
      .then((res: any) => {
        setOrderId(res.data);
        products.setProducts([]);

        setAddress({});
        setPayment({});
        setBuyed(true);
      })
      .catch((err: any) => console.error(err));
  };

  return (
    <Offcanvas show={props.show} onHide={props.onClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrinho</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {products.products.map((product, idx) => (
          <ListGroup horizontal={"sm"} className="my-2" key={idx}>
            <ListGroup.Item>{product.name}</ListGroup.Item>
            <ListGroup.Item style={{ paddingTop: "18px" }}>
              <AiOutlineMinus
                onClick={() => removeItem(idx)}
                className="minus-icon"
              />
            </ListGroup.Item>
          </ListGroup>
        ))}
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Endereço</Accordion.Header>
            <Accordion.Body>
              <Form.Select
                className="selector"
                aria-label="Selecione um endereço"
                onChange={(e) => changeAddress(e.currentTarget.value)}
              >
                <option key="-1" value="-1">
                  Selecione um endereço
                </option>
                {userContext.address
                  ? userContext.address.map((address, idx) => {
                      return (
                        <option key={idx} value={idx}>
                          {address.street}
                        </option>
                      );
                    })
                  : undefined}
              </Form.Select>
              <InputGroup>
                <InputGroup.Text>Estado</InputGroup.Text>
                <FormControl
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  aria-label="Estado"
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Cidade</InputGroup.Text>
                <FormControl
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  aria-label="Cidade"
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Rua</InputGroup.Text>
                <FormControl
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  aria-label="Rua"
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Número</InputGroup.Text>
                <FormControl
                  value={address.number}
                  onChange={(e) =>
                    setAddress({ ...address, number: e.target.value })
                  }
                  aria-label="Número"
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Text>Complemento</InputGroup.Text>
                <FormControl
                  value={address.additional}
                  onChange={(e) =>
                    setAddress({ ...address, additional: e.target.value })
                  }
                  aria-label="Complemento"
                />
              </InputGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Pagamento</Accordion.Header>
            <Accordion.Body>
              <Form.Select
                className="selector"
                aria-label="Selecione um pagamento"
                onChange={(e) => changePayment(e.currentTarget.value)}
              >
                <option key="-1" value="-1">
                  Selecione um pagamento
                </option>
                {userContext.payment
                  ? userContext.payment.map((payment, idx) => {
                      return (
                        <option key={idx} value={idx}>
                          Final{" "}
                          {payment.number?.substring(payment.number.length - 4)}
                        </option>
                      );
                    })
                  : undefined}
              </Form.Select>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    value={payment.number}
                    onChange={(e) =>
                      setPayment({ ...payment, number: e.target.value })
                    }
                    type="text"
                    placeholder="Número do cartão"
                  />
                  <Form.Control
                    value={payment.cvv}
                    onChange={(e) =>
                      setPayment({ ...payment, cvv: e.target.value })
                    }
                    type="text"
                    placeholder="CVV"
                  />
                  <Form.Control
                    value={payment.date}
                    onChange={(e) =>
                      setPayment({ ...payment, date: e.target.value })
                    }
                    type="text"
                    placeholder="Data de validade"
                  />
                  <Form.Control
                    value={payment.name}
                    onChange={(e) =>
                      setPayment({ ...payment, name: e.target.value })
                    }
                    type="text"
                    placeholder="Nome impresso"
                  />
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="button-buy">
          <Button
            disabled={disabledAddress || disabledPayment}
            onClick={() => {
              submitOrder();
            }}
            className="mt-2"
            variant="success"
          >
            Comprar
          </Button>
        </div>
        <Modal show={buyed} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Compra realizada!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Seu número do pedido é #{orderId}, mais informações foram enviadas
            para o seu e-mail!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShopCart;
