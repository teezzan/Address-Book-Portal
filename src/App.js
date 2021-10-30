import React, { useEffect } from "react";
// import { ethers } from "ethers";
import "./App.css";
import Nav from "./components/nav";
import Swap from "./components/Swap";
// import abi from './utils/AddressBook.json';

const App = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Nav />
      <Swap />
      <div  className="bottom_nav" style={{
        display: "none",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        bottom:"0",
        left: "50%",
        transform: 'translate(-50%, 0)',
      }}>
      <div className="mid-pill " >
          <a class="pill ACTIVE" href="#/swap" aria-current="page">
            Inquiry
          </a>
          <a class="pill" id="pool-nav-link" href="#/pool">
            Send Ether
          </a>
          <a class="pill" id="pool-nav-link" href="#/pool">
            Github<sup>↗</sup>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
