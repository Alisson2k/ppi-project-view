import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Col,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CardProduct from "./components/card-product/CardProduct";
import { PRODUCTS } from "../../constants/products";

import "./ProductPage.scss";

export const ProductPage: React.FC<{}> = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const history = useHistory();

  useEffect(() => {
    setProductList(PRODUCTS);
  }, [productList]);

  const detailProduct = (id?: number) => {
    history.push(`/products/${id}`);
  };

  return (
    <Container>
      <Row>
        <Col className="product-container">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Busque por um produto"
              aria-label="Busque por um produto"
              aria-describedby="basic-addon2"
            />
            <Button>Pesquisar</Button>
          </InputGroup>
        </Col>
      </Row>
      <Row xs={1} md={4} className="g-4">
        {productList.map((product) => {
          return (
            <Col className="product-container">
              <span onClick={() => detailProduct(product.id)}>
                <CardProduct product={product} />
              </span>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProductPage;
