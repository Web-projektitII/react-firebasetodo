import React from "react"
import { Routes, Route } from "react-router-dom";
import Home from "./Sivut/Home";
import Firebasetodo from "./Sivut/Firebasetodo";
import NavBar from "./Komponentit/Navbar";
import Footer from "./Komponentit/Footer";

function App(props) {
  //const existingTokens = JSON.parse(localStorage.getItem("tokens") || '');
  //const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens") || ''));
  console.log('rendering App')
  
  return (
    <>
      <NavBar/>
      <div className="container">
       <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route path="/firebasetodo" element={<Firebasetodo/>}/>
        </Routes>
      </div>
      <Footer/>
    </>  
  );
}

export default App;