import React, { useEffect, useState } from "react";
import { useEffectAsync } from "../utils/useEffectAsync";
import { Link, useNavigate } from "react-router-dom";
import loading from "../images/loading.gif";

import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { cid } from "../utils/stores";

import { sendNotification } from "../utils/Push";

import { useAccount } from "@web3modal/react";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function LoadingPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  const { address, connector, isConnected } = useAccount();

  let navigate = useNavigate();

  useEffectAsync(async () => {
    if (cid.get() && isConnected) {
      setIsAdmin(true); // SWITCH TO FALSE TO TEST NON-ADMIN USER

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
        .then((result) => {
          return result;
        });

      const loginsAsArray = Object.entries(response);
      const adminLogins = loginsAsArray.filter(
        ([key, value]) => value === address
      );
      const lastAdminLogin = adminLogins[adminLogins.length - 1][0];

      let sleepTime = 0;
      let maxTime = 300000;

      const ipfsLink = `https://${cid.get()}.ipfs.w3s.link/${address}.json`;
      const resp = await fetch(ipfsLink);
      const fileData = await resp.json();
      const threshold = fileData.threshold;
      const addresses = fileData.addresses;

      // sendNotification(addresses[0], "Please login to Sigcure to sign a message");
      // sendNotification(addresses[1], "Please login to Sigcure to sign a message");

      while (sleepTime < maxTime) {
        console.log(sleepTime);
        await sleep(10000);
        sleepTime += 10000;
        const response = await fetch(
          "https://getpantry.cloud/apiv1/pantry/d62c0d92-89f6-4ebc-bba6-085478243321/basket/logins",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            return result;
          });
        const loginsAsArray = Object.entries(response);

        const filtered = loginsAsArray.filter(
          ([key, value]) =>
            Number(key) > Number(lastAdminLogin) && addresses.includes(value)
        );
        if (filtered.length + 1 >= threshold) {
          console.log("threshold reached");
          break;
        }
      }
      navigate("/passwords", { state: { thresholdReached: true } });
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
        <section className="bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Hello {formatAddress(address)}</h1>
                <br />
                {!isAdmin && (
                  <>
                    <h2 className="h2">Thanks for signing...</h2>
                    <h2 className="h2">You're all set 🫡</h2>
                    <br />
                    <img src={loading} alt="loading..." />
                  </>
                )}
                {isAdmin && (
                  <>
                    <h2 className="h2">Hang tight 🐨</h2>
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
      <Footer />
    </div>
  );
}

export default LoadingPage;
