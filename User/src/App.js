import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Cart from "./pages/Cart/Cart";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';

function App() {
  const [token, setToken] = useState("")
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) {
      setToken(tok)
    }

  })
  console.log(token,"token")
  return (
    <>
      <Header token={token}/>
      <Toaster />
      <div className="app">
        <div>
          <BrowserRouter>
            <NavBar token={token} />

            <Routes>
              
              <Route path="/" element={<Trending />} />
              {/* <Route path="/movies" element={<Movies />} /> */}
              <Route path="/series" element={<Series />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
