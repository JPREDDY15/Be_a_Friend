import React, { useState } from 'react'
import "./Login.css"
import assets from '../../assets/assets.js'
import { signup,login,resetPass } from '../../config/firebase.js'
const Login = () => {
    const [currentState,setCurrentState]=useState("Sign up");
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const onSubmitHandler =(event)=>{
        event.preventDefault();
        if(currentState==="Sign up")
        {
            signup(userName,email,password);
        } 
        else{
            login(email,password);
        }
    }
  return (
    <div className='login'>
        <img src={assets.logo_big} alt='' className='logo'/>
        <form onSubmit={onSubmitHandler} className="login-form">
            <h2>{currentState}</h2>
            {currentState==='Sign up'?<input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" placeholder='user name' className="form-input"  required/>:null}
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='email address'className="form-input" />
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password"placeholder='password' className="form-input" />
            <button type='submit'>{currentState=='Sign up'?'Create account':'Login now'}</button>
            <div className="login-term">
                <input type="checkbox" />
                <p>Agree to the terms of use and privacy policy</p>
            </div>
            <div className="login-forgot">
                {
                    currentState==='Sign up'?<p className='login-toogle'>Already have an account<span onClick={()=>setCurrentState("Login")}>login</span></p>
                    :<p className='login-toogle'>Create an account<span onClick={()=>setCurrentState("Sign up")}>click here</span></p>
                }
                {currentState==="Login"?<p className='login-toogle'>Forgot PassWord<span onClick={()=>resetPass(email )}>reset here</span></p>:null}
            </div>
        </form>
    </div>
  )
}

export default Login