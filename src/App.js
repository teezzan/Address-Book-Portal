/* global BigInt */
import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/nav";
import Swap from "./components/Swap";
import { ethers } from "ethers";
import abi from './utils/AddressBook.json';
const contractAddress = "0x3e0f26fC65B4057499920823c854c14B7057b418";
const contractABI = abi.abi;


const App = () => {
  const [show, setShow] = useState(false)

  const [currentAccount, setCurrentAccount] = useState("");
  const [outputAddress, setOutputAddress] = useState("");
  const [outputAlias, setOutputAlias] = useState("");
  const [connected, setConnected] = useState(false);
  const [task, setTask] = useState("Send");
  const [user, setUser] = useState({
    balance: "0.0",
    alias: "alias",
    address: "Unconnected"
  });


  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        let { alias, balance } = await getMyAliasAndBalance();
        balance = Number(balance * 1000n / BigInt(10 ** 18)) / 1000;
        setUser({ ...user, balance, alias, address: "0" + account.substr(1, 4) + "..." + account.substr(account.length - 2, account.length) })

        setConnected(true);

      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getMyAliasAndBalance = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const addressBookContract = new ethers.Contract(contractAddress, contractABI, signer);
        let checkAlias = await addressBookContract.getMyAlias()
        let checkBalance = await signer.getBalance();
        return { alias: checkAlias.toString(), balance: checkBalance.toBigInt() };
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      await ethereum.request({ method: "eth_requestAccounts" });

      await checkIfWalletIsConnected();
    } catch (error) {
      console.log(error)
    }
  }
  const getAliasFromAddress = async (address) => {
    try {
      const { ethereum } = window;
      setOutputAlias("");
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const addressBookContract = new ethers.Contract(contractAddress, contractABI, signer);
        let alias = await addressBookContract.getAlias(address)
        console.log(alias)
        setOutputAlias(alias);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getAddressFromAlias = async (alias) => {
    try {
      const { ethereum } = window;
      setOutputAddress("");
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const addressBookContract = new ethers.Contract(contractAddress, contractABI, signer);
        let address = await addressBookContract.getAddress(alias)
        console.log(address)
        setOutputAddress(address);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const sendEthToAlias = async (rec_alias, amount, set1, set2) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const addressBookContract = new ethers.Contract(contractAddress, contractABI, signer);
        let send = await addressBookContract.deposit(rec_alias, {
          value: ethers.utils.parseEther(amount),
        })
        console.log(send);
        alert("Processing!")
        setOutputAddress("");
        set1("");
        set2("");
        checkIfWalletIsConnected()
        return send;
      } else {
        alert("Ethereum object doesn't exist!");
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      alert(error.message);
      console.log(error)
    }
  }


  useEffect(() => {
    checkIfWalletIsConnected()

  }, []);

  return (
    <div>
      <Nav
        task={task}
        setTask={setTask}
        user={user}
        setShow={setShow}
        show={show}
      />
      <Swap
        connected={connected}
        setConnected={setConnected}
        task={task}
        connectWalletHandler={connectWallet}
        outputAlias={outputAlias}
        outputAddress={outputAddress}
        setOutputAddress={setOutputAddress}
        setOutputAlias={setOutputAlias}
        getAliasFromAddress={getAliasFromAddress}
        getAddressFromAlias={getAddressFromAlias}
        user={user}
        sendEthToAlias={sendEthToAlias}
        setShow={setShow}
        show={show}
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
          <a className={`${task === "Inquiry" ? "pill ACTIVE" : "pill"} `}
            onClick={() => { setTask("Inquiry") }}
            href="#/inquiry"
            aria-current="page">
            Inquiry
          </a>
          <a
            className={` ${task === "Send" ? "pill ACTIVE" : "pill"} `}
            id="pool-nav-link"
            onClick={() => { setTask("Send") }}
            href="#/send">
            Send Ether
          </a>
          <a className="pill" id="pool-nav-link"
            href="https://github.com/teezzan/Adress-Book-Portal"
          >
            Github<sup>↗</sup>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
