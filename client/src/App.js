import React from "react";
import { Route, Routes } from "react-router-dom"; 
import './index.css';

import Navbar from "./components/navbar";
import LandingPage from "./pages/landing";
import Footer from "./components/footer";

import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
import RecordList from "./components/recordList";
import Edit from "./pages/edit";
import Create from "./pages/create";

import Register from './pages/register';
import Login from './pages/login';
import Analytics from "./pages/analytics";


const App = () => {
  return (
   <div>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<LandingPage />} /> 
        
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/u/:id' element={<Profile />} />
        <Route path='/records' element={<RecordList />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/create' element={<Create />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/analytics' element={<Analytics />} />
    </Routes>
    <Footer />
   </div>
  );
};

export default App;
