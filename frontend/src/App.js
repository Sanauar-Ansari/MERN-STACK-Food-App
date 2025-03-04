import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./main_page/Home";
import Login from "./main_page/Login";
import Signup from "./main_page/Signup.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/ContextReducer.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home></Home>} />
            <Route exact path="/login" element={<Login></Login>} />
            <Route exact path="/createuser" element={<Signup></Signup>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
