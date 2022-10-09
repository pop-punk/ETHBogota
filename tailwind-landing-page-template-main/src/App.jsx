import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Web3Modal } from '@web3modal/react';

import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import LoadingPage from "./pages/LoadingPage";

const config = {
  projectId: '402c23e1dcd93e001de7bf2cc30343d4',
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'web3Modal'
  }
}


function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
      <Web3Modal config={config} />
    </>
  );
}

export default App;
