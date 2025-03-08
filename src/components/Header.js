import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const handleSignOut = () =>{
    signOut(auth).then(() => {
      navigate("/");
      
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/Error");
    });
  };
  return (
    <div className='text-black  bg-gradient-to-b from-black md:fixed absolute w-screen px-8 py-2 z-50 flex flex-col md:flex-row justify-between '>
         <img className='w-48 z-40 md:mx-0 mx-auto' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo'/>  
        {user && (<div className=' flex align-center justify-center gap-2 px-8 pt-6 '>
        {/* <button onClick={handleGptSearchClick} className='text-white mb-4 font-bold px-2 py-2 rounded-md bg-opacity-45  hover:bg-opacity-85 transform transition-all duration-600 bg-purple-500 mr-3'>{showGptSearch ? "Home" : "GPT Search"}</button> */}
        <img alt='usericon' className='w-10 h-10 rounded-sm  z-60'
        src="https://wallpapers.com/images/thumbnail/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"/>
        <button onClick={handleSignOut} className='font-bold text-white mb-4'>Sign Out</button>
      </div>)}
      
    </div>
  )
}

export default Header
