import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/UI/Nav";
import Home from "./pages/home";
import Form from "./pages/Form"
import Customers from "./pages/Customers";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/form" element={<Form/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
