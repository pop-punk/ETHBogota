import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../partials/Header";
import { cid } from "../utils/stores";

import { useSignMessage } from "@web3modal/react";

function SignIn() {
  const [signature, setSignature] = useState("");
  const message = "Mickey Mouse Fuck Shit";
  const { data, error, isLoading, signMessage } = useSignMessage({ message });
  
  const handleSubmit = async (event) => {
    console.log('signing...');
    event.preventDefault();
    await signMessage();
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-900 to-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Access your passwords.</h1>
                <h1>{data}</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-yellow-500 hover:bg-yellow-400 w-full"
                        onClick={handleSubmit}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>

                <form></form>
                <div className="text-gray-600 text-center mt-6">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
