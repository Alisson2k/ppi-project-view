import React from "react";
import { Card } from "react-bootstrap";

import "./CardProduct.scss";

interface CardProductProps {
  product?: Product;
}

export const CardProduct: React.FC<CardProductProps> = (props) => {
  return (
    <Card>
      <Card.Img
        className="img-resize"
        variant="top"
        src={props?.product?.image}
      />
      <Card.Body>
        <Card.Title>{props?.product?.name}</Card.Title>
        <Card.Subtitle
          className={props?.product?.promoPrice ? "subtitle older" : "subtitle"}
        >
          R$ {props?.product?.price}
        </Card.Subtitle>
        {!!props?.product?.promoPrice ? (
          <Card.Subtitle className="subtitle">
            R$ {props?.product?.promoPrice}
          </Card.Subtitle>
        ) : undefined}
        <Card.Text className="desc-overflow">
          {props?.product?.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
