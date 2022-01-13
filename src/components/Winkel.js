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

export default function Winkel() {
  const [calcType1, setCalcType1] = useState(0.0);
  const [sideA, setSideA] = useState(0.0);
  const [sideB, setSideB] = useState(0.0);
  const [sideC, setSideC] = useState(0.0);
  const [angleA, setAngleA] = useState(0.0);
  const [angleB, setAngleB] = useState(0.0);
  const [angleC, setAngleC] = useState(0.0);
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
  }, [solution]);
  const solutionInsertLocalStorage = () => {
    setItems([
      ...items,
      {
        solution: solution,
        calcType: calcType1,
        sideA: null,
        sideB: null,
        sideC: null,
        angleA: angleA,
        angleB: angleB,
        angleC: angleC,
        error: error1
      },
    ]);
  };
  function toRadians(angle) {
    return angle * (Math.PI / 180);
  }
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
              onFocus={(e) => {
                e.target.value = "0";
              }}
            >
              <option value="0">Welche Seite wollen Sie Berechnen</option>
              <option value="Angle A from a, B, b">Angle A from a, B, b</option>
              <option value="Angle A from a, C, c">Angle A from a, C, c</option>
              <option value="Angle B from b, A, a">Angle B from b, A, a</option>
              <option value="Angle B from b, C, c">Angle B from b, C, c</option>
              <option value="Angle C from c, A, a">Angle C from c, A, a</option>
              <option value="Angle C from c, B, b">Angle C from c, B, b</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {/* Condition for rendering selected Calculation Method for which Side */}
      <Switch>
        {/*  Angle A from a, B, b*/}
        <Case condition={calcType1 === "Angle A from a, B, b"}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      setSideA(parseFloat(e.target.value));
                    }}
                    placeholder="Seite α"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Seite α">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      if (e.target.value >= 180) {
                        setError1("Winkel ist 180 oder grösser");
                      } else {
                        setError1("");
                        setAngleB(parseFloat(e.target.value));
                      }
                    }}
                    placeholder="Winkel β"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    °
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => setSideB(parseFloat(e.target.value))}
                    placeholder="Seite β"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Seite β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <Row className="justify-content-md-center">
                  <Button
                    onClick={() => {
                      let result =
                        Math.asin(
                          (toRadians(sideA) * Math.sin(toRadians(angleB))) /
                            toRadians(sideB)
                        ) *
                        (180 / Math.PI);
                      setAngleA(result);
                      setAngleC(180 - result - angleB);
                      setSolution(result);
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

        {/*  Angle A from a, C, c*/}
        <Case condition={calcType1 === "Angle A from a, C, c"}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      setSideA(parseFloat(e.target.value));
                    }}
                    placeholder="Seite α"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Seite α">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      if (e.target.value >= 180) {
                        setError1("Winkel ist 180 oder grösser");
                      } else {
                        setError1("");
                        setAngleC(parseFloat(e.target.value));
                      }
                    }}
                    placeholder="Winkel γ"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    °
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => setSideC(parseFloat(e.target.value))}
                    placeholder="Seite γ"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Seite β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <Row className="justify-content-md-center">
                  <Button
                    onClick={() => {
                      let result =
                        Math.asin(
                          (toRadians(sideA) * Math.sin(toRadians(angleC))) /
                            toRadians(sideC)
                        ) *
                        (180 / Math.PI);
                      setAngleA(result);
                      setAngleB(180 - result - angleC);
                      setSolution(result);
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

        {/*  Angle B from b, A, a */}
        <Case condition={calcType1 === "Angle B from b, A, a"}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      setSideB(parseFloat(e.target.value));
                    }}
                    placeholder="Seite β"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      if (e.target.value >= 180) {
                        setError1("Winkel ist 180 oder grösser");
                      } else {
                        setError1("");
                        setAngleA(parseFloat(e.target.value));
                      }
                    }}
                    placeholder="Winkel α"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    °
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => setSideA(parseFloat(e.target.value))}
                    placeholder="Seite α"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Seite β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <Row className="justify-content-md-center">
                  <Button
                    onClick={() => {
                      let result =
                        Math.asin(
                          (toRadians(sideB) * Math.sin(toRadians(angleA))) /
                            toRadians(sideA)
                        ) *
                        (180 / Math.PI);
                      setAngleB(result);
                      setAngleC(180 - result - angleA);
                      setSolution(result);
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

        {/*  Angle B from b, C, c */}
        <Case condition={calcType1 === "Angle B from b, C, c"}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      setSideB(parseFloat(e.target.value));
                    }}
                    placeholder="Seite β"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      if (e.target.value >= 180) {
                        setError1("Winkel ist 180 oder grösser");
                      } else {
                        setError1("");
                        setAngleC(parseFloat(e.target.value));
                      }
                    }}
                    placeholder="Winkel γ"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    °
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => setSideC(parseFloat(e.target.value))}
                    placeholder="Seite γ"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Seite β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <Row className="justify-content-md-center">
                  <Button
                    onClick={() => {
                      let result =
                        Math.asin(
                          (toRadians(sideB) * Math.sin(toRadians(angleC))) /
                            toRadians(sideC)
                        ) *
                        (180 / Math.PI);
                      setAngleB(result);
                      setAngleC(180 - result - angleC);
                      setSolution(result);
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

        {/*  Angle C from c, A, a */}
        <Case condition={calcType1 === "Angle C from c, A, a"}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      setSideC(parseFloat(e.target.value));
                    }}
                    placeholder="Seite γ"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      if (e.target.value >= 180) {
                        setError1("Winkel ist 180 oder grösser");
                      } else {
                        setError1("");
                        setAngleA(parseFloat(e.target.value));
                      }
                    }}
                    placeholder="Winkel α"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    °
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => setSideA(parseFloat(e.target.value))}
                    placeholder="Seite α"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Seite β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <Row className="justify-content-md-center">
                  <Button
                    onClick={() => {
                      let result =
                        Math.asin(
                          (toRadians(sideC) * Math.sin(toRadians(angleA))) /
                            toRadians(sideA)
                        ) *
                        (180 / Math.PI);
                      setAngleC(result);
                      setAngleB(180 - result - angleA);
                      setSolution(result);
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

        {/*  Angle C from c, B, b */}
        <Case condition={calcType1 === "Angle C from c, B, b"}>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      setSideC(parseFloat(e.target.value));
                    }}
                    placeholder="Seite γ"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => {
                      if (e.target.value >= 180) {
                        setError1("Winkel ist 180 oder grösser");
                      } else {
                        setError1("");
                        setAngleB(parseFloat(e.target.value));
                      }
                    }}
                    placeholder="Winkel β"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Winkel β">
                    °
                  </InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    class={"input"}
                    onChange={(e) => setSideB(parseFloat(e.target.value))}
                    placeholder="Seite β"
                    onFocus={(e) => {
                      e.target.value = "";
                    }}
                  />
                  <InputGroup.Text className="input" placeholder="Seite β">
                    cm
                  </InputGroup.Text>
                </InputGroup>
                <Row className="justify-content-md-center">
                  <Button
                    onClick={() => {
                      let result =
                        Math.asin(
                          (toRadians(sideC) * Math.sin(toRadians(angleB))) /
                            toRadians(sideB)
                        ) *
                        (180 / Math.PI);
                      setAngleC(result);
                      setAngleA(180 - result - angleB);
                      setSolution(result);
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
      <If condition={error1 != ""}>
        <Then>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={5}>
                <Alert variant={"danger"}>{error1}</Alert>
              </Col>
            </Row>
          </Container>
        </Then>
      </If>
    </div>
  );
}
