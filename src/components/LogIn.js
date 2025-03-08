import React, {useRef, useState } from 'react'
import Header from './Header';
import { validate } from '../utils/validate';
import {  createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import {  updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";

const LogIn = () => {
  const [isSignInForm , setIsSignInForm] = useState(true);
  const [errorMsg , setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);


  const handleButtonClick = (e) =>{
    e.preventDefault();
    //validate the form data
    const msg = validate(email.current.value , password.current.value , !isSignInForm ? name.current.value : null);
   setErrorMsg(msg);

   if(msg){
   return;
   }

   //Sign In / Sign Up Logic

   if(!isSignInForm){
    //Sign Up Logic
    createUserWithEmailAndPassword(
      auth
    , email.current.value 
    , password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: 'https://wallpapers.com/images/thumbnail/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp',
    }).then(() => {
      const { uid, email, displayName, photoURL } = auth.currentUser;
      dispatch(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        })
      );
      // setIsSignInForm(true);
      // setErrorMsg("Account created successfully. Please sign in.");

      // Profile updated!
      // ...
      navigate("/browse");
    }).catch((error) => {
      // An error occurred
      // ...
      setErrorMsg(error.message)
    });

    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode+ '-' + errorMessage);
    // ..
  });
    

   }
   else{
    //Sign In Logic

    signInWithEmailAndPassword(auth,email.current.value , password.current.value)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    
    navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode + "-" + errorMessage);
  });

   }
    

   
  }

  const toggleSignInForm = (e) =>{
    setIsSignInForm(!isSignInForm);
    e.preventDefault();
    setErrorMsg(null);

  };
  return (
    <div>
      <Header />
      <img className='absolute h-screen w-screen  object-cover' src='https://analyticsindiamag.com/wp-content/uploads/2019/05/apps.55787.9007199266246365.687a10a8-4c4a-4a47-8ec5-a95f70d8852d.jpg' alt='background'/>
      <div className='w-full h-full bg-black opacity-50 absolute left-0 top-0'></div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute flex flex-col px-10 py-10 sm:w-1/2 md:w-1/2 lg:w-3/12 text-white bg-black bg-opacity-75 rounded-md left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%]'>
       
       <h1 className='text-white font-bold opacity-100 mb-3 text-[30px]'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
       {!isSignInForm &&(
         <input ref={name}  type='text' placeholder='Full Name' className=' p-3 my-2 bg-gray-600 opacity-55  rounded-sm' />
       )}
        <input ref={email} type='email' placeholder='Email Address' className=' p-3 my-2 bg-gray-600 opacity-55 rounded-smc' />
        <input ref={password} type='password' placeholder='Password' className='p-3 bg-gray-600 opacity-55 my-2 rounded-sm' />
        <p className='text-red-500'>{errorMsg}</p>
        <button onClick={handleButtonClick} className='md:p-4 p-2 my-2 mt-7 md:text-lg text-sm bg-red-600 rounded-md  text-white'>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className='mt-3'>{isSignInForm ? "New User?" : "Already User?"} <span ><a href='/' className='font-bold' onClick={toggleSignInForm}>{isSignInForm ? "Sign Up Now." : "Sign In Now."} </a></span> </p>
      
        </form>
      
      
    </div>
  )
}

export default LogIn;
