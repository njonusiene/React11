import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Input from "./pages/Input";
import Header from "./components/Header";
import './styles/style.scss'
import Footer from "./components/Footer";
import AddPetLog from "./pages/AddPetLog";
import PetLog from "./pages/PetLog";


export default function App() {
 
  return (
    <>
       <Header/>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/add-pet" element={<Input/>}/>
            <Route path="/pet-log/:id" element={<PetLog/>}/>
            <Route path="/add-pet-log/:id" element={<AddPetLog/>}/>
          </Routes>
        </Router>
        <Footer/>
    </>
  )
}
