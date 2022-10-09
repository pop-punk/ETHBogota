import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../partials/Header";
import Footer from '../partials/Footer';

import { ConnectButton, useAccount } from "@web3modal/react";
import { ethers } from "ethers";

import { Web3Storage, File } from "web3.storage";
import { cid } from '../utils/stores';

// import { sendNotification } from '../utils/Push';

function SignUp() {
  const [threshold, setThreshold] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  let navigate = useNavigate();

  const { address, connector, isConnected } = useAccount();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const obj = { owner: address, threshold: threshold, addresses: [address1, address2], passwords: [btoa(password1), btoa(password2)] };
    const buffer = Buffer.from(JSON.stringify(obj));

    const files = [
      new File([buffer], `${address}.json`),
    ];

    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZCNjE5MjJkYzk4QTI2QUMzQjJEOTQyYTMxNDNlMzRjNzYxMERkOTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjUyMTA0ODY5MjAsIm5hbWUiOiJTaWdjdXJlIn0.Mxck2M7MQP26yEXo4oZrWfznxk_O_BiVLpw2llqLGM4",
    });

    const cidId = await client.put(files)
    cid.set(cidId);

    // sendNotification(address1, "You have been added to a Sigcure multisig!");
    // sendNotification(address2, "You have been added to a Sigcure multisig!");
    navigate("/signin");

  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header showButtons={true}/>

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Get started today.</h1>

              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    {!isConnected && (
                      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <ConnectButton />
                      </div>
                    )}
                    {isConnected && (
                      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <p>Connected as {address}</p>
                      </div>
                    )}
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="threshold"
                      >
                        Signature Threshold{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="threshold"
                        type="number"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter the signature threshold"
                        required
                        onInput={(e) => setThreshold(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="address1"
                      >
                        Address #1 <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="address1"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter the first address"
                        required
                        onInput={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="address2"
                      >
                        Address #2 <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="address2"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter the second address"
                        required
                        onInput={(e) => setAddress2(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="password1"
                      >
                        Password #1 <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password1"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter the first password"
                        required
                        onInput={(e) => setPassword1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-300 text-sm font-medium mb-1"
                        htmlFor="password2"
                      >
                        Password #2 <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password2"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter the second password"
                        required
                        onInput={(e) => setPassword2(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-yellow-500 hover:bg-yellow-400 w-full"
                        onClick={handleSubmit}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-600 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div
                    className="border-t border-gray-600 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form></form>
                <div className="text-gray-500 text-center mt-6">
                  Already using Sigcure?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        </main>

{/*  Site footer */}
<Footer />

      
    </div>
  );
}

export default SignUp;
