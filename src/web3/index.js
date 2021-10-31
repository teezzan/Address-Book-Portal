// import { ethers } from "ethers";
import abi from './utils/AddressBook.json';
// const contractAddress = "0x3e0f26fC65B4057499920823c854c14B7057b418";
// const contractABI = abi.abi;

let checkIfWalletIsConnected = async () => {
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
            return account;
        } else {
            console.log("No authorized account found")
        }
    } catch (error) {
        console.log(error);
    }
}

export { checkIfWalletIsConnected };