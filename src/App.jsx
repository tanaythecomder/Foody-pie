
import {
  BrowserRouter as Router,
  Routes,
  Route
}
  from "react-router-dom"
import Login from "./screens/Login"
import "bootstrap"
import Signup from "./screens/Signup"
import { CartProvider } from "./components/ContextReducer"
import OrderHistory from "./screens/Orderhistory"
import Home from "./screens/Home"

// import './App.css'
function App() {

  return (

    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorders" element={<OrderHistory />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
