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
export default function Pythagoras() {
  const [calcType1, setCalcType1] = useState(0.0);
  const [sideA, setSideA] = useState(0.0);
  const [sideB, setSideB] = useState(0.0);
  const [sideC, setSideC] = useState(0.0);
  const [solution, setSolution] = useState(0.0);
  const [error1, setError1] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("storage"))
  );
  useEffect(() => {
    localStorage.setItem("storage", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    solutionInsertLocalStorage();
    setError1("");
  }, [solution]);
  const areTheNumbersAlmostEqual = (num1, num2) => {
    return Math.abs( num1 - num2 ) < Number.EPSILON;
}
  const calculateSolution = () => {
    if (calcType1 === "Hypotenuse / Seite γ") {
      setError1("");
    } else if (calcType1 === "Seite α / Seite β") {
      if (sideC > sideB   ) {
        setError1("");
      } else if(sideC <= sideB ){
        setError1("Invalider input: stellen sie Sicher das γ > α/β");
      }
    }
  };
  const solutionInsertLocalStorage = () => {
    setItems([
      ...items,
      {
        solution: solution,
        calcType: calcType1,
        sideA: sideA,
        sideB: sideB,
        sideC: sideC,
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
            <Form.Select
              onChange={(e) => {
                console.log("e.target.value", e.target.value);
                setCalcType1(e.target.value);
              }}
            >
              <option value="0">Welche Seite wollen Sie Berechnen</option>
              <option value="Hypotenuse / Seite γ">Hypotenuse / Seite γ</option>
              <option value="Seite α / Seite β">Seite α / Seite β</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {/* Condition for rendering selected Calculation Method for which Side */}
      <Switch>
        {/*  Condtion for Calculate Side C*/}
        <Case condition={calcType1 === "Hypotenuse / Seite γ"}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <InputGroup className="mb-3">
                  <FormControl
                    onChange={(e) => {
                      setSideA(parseFloat(e.target.value));
                    }}
                    placeholder="Seite α"
                  />
                  <InputGroup.Text className="input" placeholder="Seite α">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    onChange={(e) => setSideB(parseFloat(e.target.value))}
                    placeholder="Seite β"
                  />
                  <InputGroup.Text className="input" placeholder="Seite β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <Row className="justify-content-md-center">
                  <Button
                    onClick={() => {
                      let result =
                        Math.round(
                          Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2)) *
                            10000
                        ) / 10000;
                      setSideC(result);
                      setSolution(result);
                      calculateSolution();
                      window.location.reload(false);
                    }}
                    variant="primary"
                  >
                    Berechnen!
                  </Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </Case>

        {/*  Condtion for Calculate Side A / Side B */}
        <Case condition={calcType1 === "Seite α / Seite β"}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <InputGroup className="mb-3">
                  <FormControl
                    onChange={(e) => {
                      setSideB(parseFloat(e.target.value));
                    }}
                    placeholder="Seite β"
                  />
                  <InputGroup.Text className="input" placeholder="Seite β">
                    cm
                  </InputGroup.Text>
                </InputGroup>

                <InputGroup className="mb-3">
                  <FormControl
                    onChange={(e) => setSideC(parseFloat(e.target.value))}
                    placeholder="Hypotenuse / Seite γ"
                  />
                  <InputGroup.Text
                    className="input"
                    placeholder="Hypotenuse / Seite γ"
                  >
                    cm
                  </InputGroup.Text>
                </InputGroup>

                <Row className="justify-content-md-center">
                  <Button
                    onClick={() => {
                      
                      let result =
                        Math.round(
                          Math.sqrt(Math.pow(sideC, 2) - Math.pow(sideB, 2)) *
                            10000
                        ) / 10000;
                      setSideA(result);
                      setSolution(result);
                      calculateSolution();
                      window.location.reload(false);
                    }}
                    variant="primary"
                  >
                    Berechnen!
                  </Button>

                  
                </Row>
              </Col>
            </Row>
          </Container>
        </Case>

        {/* Condtion for Default value */}
        <Default>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <Alert variant={"primary"}>
                  Bitte wählen Sie eine Seite zum Ausrechnen!
                </Alert>
              </Col>
            </Row>
          </Container>
        </Default>
      </Switch>
    </div>
  );
}
