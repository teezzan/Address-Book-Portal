import { ethers } from "ethers";


const [currentAccount, setCurrentAccount] = useState("");
const [alias, setAlias] = useState("");
const [recalias, setRecAlias] = useState("");
const [result, setResult] = useState("");
const [myAlias, setMyAlias] = useState("");
const [amount, setAmount] = useState(0);

const contractAddress = "0x3e0f26fC65B4057499920823c854c14B7057b418";
const contractABI = abi.abi;
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

            getMyAlias();
        } else {
            console.log("No authorized account found")
        }
    } catch (error) {
        console.log(error);
    }
}


const connectWallet = async () => {
    try {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Get MetaMask!");
            return;
        }

        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
    } catch (error) {
        console.log(error)
    }
}

const checkAddress = async () => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const addressBookContract = new ethers.Contract(contractAddress, contractABI, signer);
            //do stuff
            let checkResult = await addressBookContract.getAddress(alias)
            setResult(checkResult);
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error)
    }
}

const getMyAlias = async () => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const addressBookContract = new ethers.Contract(contractAddress, contractABI, signer);
            //do stuff
            let checkResult = await addressBookContract.getMyAlias()
            console.log(checkResult)
            setMyAlias(checkResult.toString());
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error)
    }
}

const updateAlias = async () => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const addressBookContract = new ethers.Contract(contractAddress, contractABI, signer);
            //do stuff
            let checkResult = await addressBookContract.addAlias(alias)
            console.log(checkResult)
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error)
    }
}

const sendEthToAlias = async () => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const addressBookContract = new ethers.Contract(contractAddress, contractABI, signer);
            //do stuff
            let send = await addressBookContract.deposit(recalias, {
                value: ethers.utils.parseEther(amount),
            })
            console.log(send)
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log(error)
    }
}