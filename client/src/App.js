
import React from "react";
import { Route, Routes } from "react-router-dom"; 
import './index.css';

import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Profile from "./pages/profile"

// import SignUp from './modal/signup';
// import SignIn from './modal/login';


const App = () => {
  return (
   <div className='mx-3'>
    <Navbar />
    <Routes>
      <Route exact path='/' element={<RecordList />} /> 
      <Route path='/edit/:id' element={<Edit />} />
      <Route path='/create' element={<Create />} />
      <Route path='/u/:userId' element={<Profile />} />
      {/* <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<SignIn />} /> */}
    </Routes>
   </div>
  );
};

export default App;