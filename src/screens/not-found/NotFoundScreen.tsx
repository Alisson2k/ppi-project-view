import { Alert, Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const NotFoundScreen = () => {
  const history = useHistory();
  
  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="danger">
            Essa página não existe =(. Clique aqui{" "}
            <Alert.Link onClick={() => history.push(`/login`)}>aqui</Alert.Link> para voltar para a tela
            de login.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundScreen;
