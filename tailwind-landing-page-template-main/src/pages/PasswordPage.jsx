import React, { useEffect, useState } from "react";
import { useEffectAsync } from "../utils/useEffectAsync";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { cid } from "../utils/stores";
import { useAccount } from "@web3modal/react";
import { useLocation, useNavigate } from "react-router-dom";

function PasswordPage() {
  let navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    navigate("/");
  }

  const [passwords, setPasswords] = useState([]);
  const { address, connector, isConnected } = useAccount();

  useEffectAsync(async () => {
    if (cid.get() && isConnected) {
      const ipfsLink = `https://${cid.get()}.ipfs.w3s.link/${address}.json`;
      const resp = await fetch(ipfsLink);
      const fileData = await resp.json();
      const decodedPasswords = fileData.passwords.map((password) => {
        return atob(password);
      });
      setPasswords(decodedPasswords);
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
                <h2 className="h2">Here are your passwords...</h2>
                <br />
                {passwords.map((password) => {
                  return <h2 className="h2 text-yellow-500">{password}</h2>;
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PasswordPage;
