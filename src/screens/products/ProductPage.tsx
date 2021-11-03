import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CardProduct from "./components/card-product/CardProduct";
import { getProducts } from "../../services/products/products";

import "./ProductPage.scss";

export const ProductPage: React.FC<{}> = () => {
  const [searchBy, setSearchBy] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>([]);
  const history = useHistory();

  useEffect(() => {
    getProducts()
      .then((res: any) => {
        setProductList(res.data);
      })
      .catch((err: any) => console.error(err));
  }, [setProductList]);

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
              value={searchBy}
              onChange={(e) => setSearchBy(e.currentTarget.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row xs={1} md={4} className="g-4">
        {productList
          .filter((p) => p.name?.toLowerCase().indexOf(searchBy.toLowerCase()) !== -1)
          .map((product, idx) => {
            return (
              <Col key={idx} className="product-container">
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
