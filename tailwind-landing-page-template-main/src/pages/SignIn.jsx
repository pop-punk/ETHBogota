import React, { useEffect, useState } from "react";
import { useEffectAsync } from "../utils/useEffectAsync";
import { Link, useNavigate } from "react-router-dom";

import Header from "../partials/Header";
import { cid } from "../utils/stores";
import Footer from '../partials/Footer';
import logoslim from "../images/logoslim.png";

import { useSignMessage, useAccount, ConnectButton } from "@web3modal/react";
import { Web3Storage, File } from "web3.storage";

function SignIn() {
  const [loginRecorded, setLoginRecorded] = useState(undefined);
  const message = "Mickey Mouse Fuck Shit";
  const { data, error, isLoading, signMessage } = useSignMessage({ message });
  const { address, connector, isConnected } = useAccount();

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signMessage();
  };

  useEffect(() => {
    if (data) {
      console.log("cid", cid);
      const now = Date.now().toString();
      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      var raw = {};
      raw[now] = address;

      var json = JSON.stringify(raw);

      var requestOptions = {
        method: "PUT",
        headers: headers,
        body: json,
        redirect: "follow",
      };

      fetch(
        "https://getpantry.cloud/apiv1/pantry/d62c0d92-89f6-4ebc-bba6-085478243321/basket/logins",
        requestOptions
      )
        .then((response) => response.text())
        .catch((error) => console.log("error", error));
      navigate("/loading");
    }
  }, [data]);

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
                <h1 className="h1">Access your passwords.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    {isConnected && (
                      <button
                        className="btn text-white bg-yellow-500 hover:bg-yellow-400 w-full"
                        onClick={handleSubmit}
                      >
                        Sign in
                      </button>
                    )}
                    {!isConnected && (
                      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <ConnectButton />
                      </div>
                    )}
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
                <br />
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

export default SignIn;
