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

export default function Height() {
  const [calcType1, setCalcType1] = useState(0.0);
  const [height, setHeight] = useState(0.0);
  const [sideC, setSideC] = useState(0.0);
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
        calcType: "Fläche",
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
                onChange={(e) => {
                  setHeight(parseFloat(e.target.value));
                }}
                placeholder="Höhe"
              />
              <InputGroup.Text className="input" placeholder="Höhe">
                cm
              </InputGroup.Text>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                onChange={(e) => setSideC(parseFloat(e.target.value))}
                placeholder="Seite γ"
              />
              <InputGroup.Text className="input" placeholder="Seite γ">
                cm
              </InputGroup.Text>
            </InputGroup>

            <Row className="justify-content-md-center">
              <Button
                onClick={() => {
                  setSolution((height * sideC) / 2);
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
