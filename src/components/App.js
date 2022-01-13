import { useState, useEffect } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { If, Then, Else, When, Unless, Switch, Case, Default } from "react-if";
import Pythagoras from "./Pythagoras.js";
import Winkel from "./Winkel.js";
import Height from "./Height.js";
import Area from "./Area.js"
import List from "./List.js"
import Sin from "./Sin.js"
import Cos from "./Cos.js"
import Tan from "./Tan.js"

import Logo from "../logo.jpg";
function App() {
  const [calcType, setCalcType] = useState(0);

  return (
    <div className="App" >
      <header className="App-header">
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1%",
          }}
          width={"15%"}
          src={Logo}
          alt="BigCo Inc. logo"
        />
      </header>
      <body>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={5}>
              <Form.Select
                onChange={(e) => {
                  console.log("e.target.value", e.target.value);
                  setCalcType(e.target.value);
                }}
              >
                <option value="0">Was wollen Sie Berechnen</option>
                <option value="pythagoras">pythagoras</option>
                <option value="Winkel">Winkel</option>
                <option value="Höhe">Höhe</option>
                <option value="Fläche">Fläche</option>
                <option value="Sin">Sin</option>
                <option value="Cos">Cos</option>
                <option value="Tan">Tan</option>
              </Form.Select>
            </Col>
          </Row>
        </Container>

        {/* Condition for rendering selected Calculation Method */}
        <Switch>
          <Case condition={calcType === "pythagoras"}>
            <Pythagoras />
          </Case>
          <Case condition={calcType === "Winkel"}>
            <Winkel />
          </Case>
          <Case condition={calcType === "Höhe"}>
            <Height />
          </Case>
          <Case condition={calcType === "Fläche"}>
            <Area />
          </Case>
          <Case condition={calcType === "Sin"}>
            <Sin />
          </Case>
          <Case condition={calcType === "Cos"}>
            <Cos />
          </Case>
          <Case condition={calcType === "Tan"}>
            <Tan />
          </Case>

          <Default>
            <Container>
              <Row className="justify-content-md-center">
                <Col xs={5}>
                  <Alert variant={"primary"}>
                    Bitte wählen Sie eine Option!
                  </Alert>
                </Col>
              </Row>
            </Container>
          </Default>
        </Switch>


        <List/>
      </body>
    </div>
  );
}

export default App;
