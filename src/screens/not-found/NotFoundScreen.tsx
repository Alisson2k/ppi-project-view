import { Alert, Container, Col, Row } from "react-bootstrap";

export const NotFoundScreen = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="danger">
            Essa página não existe =(. Clique aqui{" "}
            <Alert.Link href="/login">aqui</Alert.Link> para voltar para a tela
            de login.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundScreen;
