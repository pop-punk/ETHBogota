import React, { useEffect, useState } from "react";
import { useEffectAsync } from "../utils/useEffectAsync";
import { Link } from "react-router-dom";
import loading from "../images/loading.gif";

import Header from "../partials/Header";
import { cid } from "../utils/stores";

import { useAccount } from "@web3modal/react";

function LoadingPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [timer, setTimer] = useState(undefined);

  const { address, connector, isConnected } = useAccount();

  useEffectAsync(async () => {
    if (cid.get()) {
      setIsAdmin(true); // SWITCH TO FALSE TO TEST NON-ADMIN USER
      setTimer(Date.now());

      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      var requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };

      const response = await fetch(
        "https://getpantry.cloud/apiv1/pantry/d62c0d92-89f6-4ebc-bba6-085478243321/basket/logins",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => { return result } )
      console.log(response);
    }
  }, [address]);

  const formatAddress = (address) => {
    return address.slice(0, 3) + "..." + address.slice(-4);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header showButtons={false} />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="h2">Hello {formatAddress(address)}</h2>
                <br />
                {!isAdmin && (
                  <>
                    <h2 className="h2">Thanks for signing...</h2>
                    <h2 className="h2">You're all set!</h2>
                    <br />
                    <img src={loading} alt="loading..." />
                  </>
                )}
                {isAdmin && (
                  <>
                    <h2 className="h2">Hang tight!</h2>
                    <h2 className="h2">We're waiting for more signatures!</h2>
                    <h3 className="h3">(we'll wait for 5 minutes)</h3>
                    <br />
                    <img src={loading} alt="loading..." />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoadingPage;
