import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import List from "./Component/List";
import Cart from "./Component/Cart";
import data from "./Data/Data";
import { useEffect, useState } from "react";
import Login from "./Component/Login";

function App() {
  const [datas, setDatas] = useState(data);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify([]));
    sessionStorage.setItem("count", JSON.stringify(0));
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Store
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/List/1">
              List
            </Nav.Link>
            <Nav.Link as={Link} to="/Cart">
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to="/Login">
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home datas={datas} setDatas={setDatas} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/List/:id" element={<List datas={datas} />}>
          <Route path="1" element={<List datas={datas} />}></Route>
        </Route>
        <Route
          path="/Cart"
          element={<Cart datas={datas} setDatas={setDatas} />}
        />
      </Routes>
    </div>
  );
}

export default App;
