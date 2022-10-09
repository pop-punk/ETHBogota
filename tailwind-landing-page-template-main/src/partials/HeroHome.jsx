import React, { useState } from 'react';
import Modal from '../utils/Modal';

import HeroImage from '../images/diagram.gif';
import logoslim from "../images/logoslim.png"

function HeroHome() {

  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative">
      <section className="bg-gradient-to-b from-gray-900 to-gray-800"></section>

      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#5A5A5A" offset="0%" />
              <stop stopColor="#080808" offset="77.402%" />
              <stop stopColor="#676767" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <img className="max-w-xl inline" src={logoslim}/>

           
            <div className="max-w-3xl mx-auto">
              
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-gray-600 hover:bg-gray-400 w-full mb-4 sm:w-auto sm:mb-0" href="/signin">Sign In</a>
                </div>
                <div>
                  <a className="btn text-white bg-yellow-500 hover:bg-yellow-400 w-full sm:w-auto sm:ml-4" href="/signup">Sign Up</a>
                </div>
              </div>
            </div>
          </div>
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Sigcure Explained</h1>
            <p className="text-xl text-gray-600">Traditional multisig wallets require multiple on chain signatures, each of which triggers a gas fee. Sigcure takes signature validation off chain to allow users to reap the security benefits of multisig technology without the burden of gas fees.</p>
          </div>
          {/* Hero image */}
          <div>
            <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
              <div className="flex flex-col justify-center">
                <img className="mx-auto" src={HeroImage} width="768" height="432" alt="Hero" />
                
              </div>
              
              
            </div>

      

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroHome;