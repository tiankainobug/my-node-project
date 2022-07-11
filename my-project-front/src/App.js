import React from 'react';
import './App.css';
import Login from "./pages/login";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home";

const token = localStorage.getItem('token')
const App = () => (
    <div>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={token ? <Home /> : <Navigate to={'/login'} />}/>
        </Routes>
    </div>
);

export default App;
