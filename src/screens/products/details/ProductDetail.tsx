import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Accordion,
  Badge,
  Button,
  Container,
  Col,
  Image,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getProductsById } from "../../../services/products/products";
import { ProductsContext } from "../../../contexts/ProductsContext";

import "./ProductDetail.scss";

export const ProductDetail: React.FC<{}> = () => {
  const { ["id"]: productId } = useParams() as any;
  const [product, setProduct] = useState<Product>({});
  const history = useHistory();

  const productsContext = useContext(ProductsContext);

  useEffect(() => {
    getProductsById(productId)
      .then((res: any) => setProduct(res.data))
      .catch((err: any) => console.error(err));
  }, [setProduct]);

  const addItem = () => {
    const append = productsContext.products;
    append.push(product);
    productsContext.setProducts(append);
  };

  return (
    <Container>
      <Row className="product-row">
        <Col>
          <Image fluid rounded className="p-image" src={product.image}></Image>
          <h2>{product.name}</h2>
          {product.promoPrice ? (
            <Badge bg="secondary" className="promo-price">
              R$ {product.price}
            </Badge>
          ) : undefined}
          {!!product.promoPrice ? (
            <h3>
              <Badge bg="success">R$ {product.promoPrice}</Badge>
            </h3>
          ) : (
            <h3>
              <Badge bg="success">R$ {product.price}</Badge>
            </h3>
          )}
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Descrição</Accordion.Header>
              <Accordion.Body>{product.description}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="add-cart">
            <Button
              onClick={() => history.push("/products")}
              variant="secondary"
            >
              Voltar
            </Button>
            <Button variant="success" onClick={(e) => addItem()}>
              Adicionar ao carrinho
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
