import { useState, useEffect } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Alert,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { If, Then, Else, When, Unless, Switch, Case, Default } from "react-if";

export default function Cos() {
  const [input, setInput] = useState(0.0);
  const [solution, setSolution] = useState(0.0);
  const [error1, setError1] = useState("");
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("storage")));
  useEffect(() => {
    localStorage.setItem("storage", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    solutionInsertLocalStorage();
  }, [solution]);


  const solutionInsertLocalStorage = () => {
    setItems([
      ...items,
      {
        solution: solution,
        calcType: "Cos",
        sideA: null,
        sideB: null,
        sideC: null,
        angleA: null,
        angleB: null,
        angleC: null,
        error: error1
      },
    ]);
  };


  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={5}>
            <InputGroup className="mb-3">
              <FormControl
                onChange={(e) => setInput(parseFloat(e.target.value))}
                placeholder=""
              />
              <InputGroup.Text className="input" placeholder="">
                x
              </InputGroup.Text>
            </InputGroup>

            <Row className="justify-content-md-center">
              <Button
                onClick={() => {
                  setSolution(Math.cos(input * Math.PI / 180));
                }}
                variant="primary"
              >
                Berechnen!
              </Button>
              <h1
                style={{ textAlign: "center" }}
                className="justify-content-md-center"
              >
                {solution}
              </h1>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
