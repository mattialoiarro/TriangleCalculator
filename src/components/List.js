import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  InputGroup,
  Button,
  Alert
} from "react-bootstrap";
import { If, Then, Else, When, Unless, Switch, Case, Default } from "react-if";
import Turtle from "react-turtle";
export default function List() {
  const [newItem, setnewItem] = useState("");
  const [items, setItems] = useState([]);
  let counter = 0;
  useEffect(() => {
    setInterval(function () {
      getLocalStorage();
    }, 1000);
  }, []);
  const getLocalStorage = () => {
    let storage = localStorage.getItem("storage");
    if (storage == null || storage.length === 0) {
      localStorage.setItem("storage", JSON.stringify([]));
      storage = localStorage.getItem("storage");
    } else {
      setItems(JSON.parse(storage));
    }
  };
  const resetList = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  return (
    <Card>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={5}>
            <div>
              <ListGroup style={{ margin: "3%" }}>
                {items
                  .slice(0)
                  .reverse()
                  .map((e) => {
                    return (
                      <If condition={e.solution !== 0}>
                        <Then>
                          <ListGroup.Item style={{ padding: "10%" }}>
                            <p>
                              <strong style={{ fontSize: "150%" }}>
                                Lösung: : {e.solution}
                              </strong>
                            </p>
                            <p>
                              <strong>Was ?: </strong> {e.calcType}
                            </p>
                            <If condition={e.sideA !== null}>
                              <Then>
                                <p>
                                  <strong>Seite A: </strong>
                                  {e.sideA}
                                </p>
                                <p>
                                  <strong>Seite B: </strong>
                                  {e.sideB}
                                </p>
                                <p>
                                  <strong>Seite C: </strong>
                                  {e.sideC}
                                </p>
                              </Then>
                            </If>
                            <If condition={e.angleA !== null && e.error == ""}>
                              <Then>
                                <p>
                                  <strong>Winkel A: </strong>
                                  {e.angleA}
                                </p>
                                <p>
                                  <strong>Winkel B: </strong>
                                  {e.angleB}
                                </p>
                                <p>
                                  <strong>Winkel C: </strong>
                                  {e.angleC}
                                </p>
                              </Then>
                            </If>
                            <If condition={e.error !== ""}>
                              <Then>
                                <p>
                                <Alert variant={"danger"}>{e.error}</Alert> 
                                </p>
                              </Then>
                            </If>
                          </ListGroup.Item>
                        </Then>
                      </If>
                    );
                  })}
              </ListGroup>
              <Row className="justify-content-md-center">
                <Button
                  onClick={() => {
                    resetList();
                  }}
                  variant="primary"
                >
                  Reset List!
                </Button>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Card>
  );
}
