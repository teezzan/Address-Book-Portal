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
    </div>
  );
};

export default App;
