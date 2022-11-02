import React from "react";
import { Route, Routes } from "react-router-dom"; 
import './index.css';

import Navbar from "./components/navbar";
import LandingPage from "./pages/landing";
import Footer from "./components/footer";

import Dashboard from "./pages/dashboard"
import Profile from "./pages/profile"
//import RecordList from "./components/recordList";
// import Edit from "./components/edit";
// import Create from "./components/create";

import SignUp from './modal/signup';
import SignIn from './modal/login';


const App = () => {
  return (
   <div>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<LandingPage />} /> 
        <Route path='/dashboard' element={<Dashboard />} /> 
        <Route path='/u/:userId' element={<Profile />} />
        {/* <Route path='/edit/:id' element={<Edit />} />
        <Route path='/create' element={<Create />} /> */}
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />
    </Routes>
    <Footer />
   </div>
  );
};

export default App;