import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import LOGO from "../../src/file.png";
import { USER_AVATAR } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isScrolled, setIsScrolled] = useState(false);
  // Sign Out function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");

        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/Error");
      });
  };

  // Firebase Authentication state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        // navigate("/browse");
        if (user) {
          navigate("/browse");
        }

        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");

        // ...
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch, navigate]);

  // Scroll effect: Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGptSearchClick = () => {
    // dispatch(toggleGptSearchView());
  };
  return (
    <div className={`w-screen px-8 py-2 z-50 flex flex-col md:flex-row justify-between transition-all duration-300 fixed ${
      isScrolled ? "bg-black" : "bg-gradient-to-b from-black"
    }`}>
      <img className="w-48 z-40 md:mx-0 mx-auto" src={LOGO} alt="logo" />
      {user && (
        <div className=" flex align-center justify-center gap-2 px-8 pt-6 ">
          {/* <button onClick={handleGptSearchClick} className='text-white mb-4 font-bold px-2 py-2 rounded-md bg-opacity-45  hover:bg-opacity-85 transform transition-all duration-600 bg-purple-500 mr-3'>{showGptSearch ? "Home" : "GPT Search"}</button> */}
          <img
            alt="usericon"
            className="w-10 h-10 rounded-sm  z-60"
            src={USER_AVATAR}
          />
          <button onClick={handleSignOut} className="font-bold text-white mb-4">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
