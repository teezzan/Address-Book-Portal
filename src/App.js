import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";
import "./App.css";
import Nav from "./components/nav";
import Swap from "./components/Swap";
// import abi from './utils/AddressBook.json';


const App = () => {
  useEffect(() => { }, []);
  const [connected, setConnected] = useState(false);
  const [task, setTask] = useState("Send");
  let user = {
    balance: "0.44 ETH",
    alias: "@teezzan",
    address: "0x23h..7ee"
  }
  return (
    <div>
      <Nav
        task={task}
        setTask={setTask}
        user={user}
      />
      <Swap
        connected={connected}
        setConnected={setConnected}
        task={task}
      />
      <div className="bottom_nav" style={{
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "0",
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
