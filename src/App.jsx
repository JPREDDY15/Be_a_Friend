import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Chat from './pages/chat/Chat';
import ProfileUpdate from './pages/profileupdate/ProfileUpdate';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { AppContext } from './contex/AppContext';
const App = () => {
  const navigate=useNavigate();
  const {loadUserData}=useContext(AppContext);

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user)
      {
        navigate('/chat')
        await loadUserData(user.uid)
      }
      else{
       navigate('/')
      }
    }) 
  },[])
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='chat' element={<Chat />} />
        <Route path='profileupdate' element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
