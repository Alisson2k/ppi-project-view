import { Button, Container, Col, Form, Row } from "react-bootstrap";

import "./LoginPage.scss";

export const LoginPage = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className="form-content">
          <Form>
            <Form.Group>
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu usuário"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
              ></Form.Control>
            </Form.Group>
          </Form>
          <Button className="button" variant="primary" type="submit">
            Entrar
          </Button>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
