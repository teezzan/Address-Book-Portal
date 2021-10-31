import React, { useState, useEffect } from "react";
import "./swap.css";
import { ArrowDown, SettingsIcon } from "./Icons";
import EthIcon from "../images/download.png";
import useConstant from 'use-constant';
import { useAsync } from 'react-async-hook';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
const nullAddress = "0x0000000000000000000000000000000000000000";

function Swap(props) {
  const useDebouncedSearch = (searchFunction) => {

    // Handle the input text state
    const [inputText, setInputText] = useState('');

    // Debounce the original search async function
    const debouncedSearchFunction = useConstant(() =>
      AwesomeDebouncePromise(searchFunction, 500)
    );

    // The async callback is run each time the text changes,
    // but as the search function is debounced, it does not
    // fire a new request on each keystroke
    const searchResults = useAsync(
      async () => {
        if (inputText.length === 0) {
          return [];
        } else {
          return debouncedSearchFunction(inputText);
        }
      },
      [debouncedSearchFunction, inputText]
    );

    // Return everything needed for the hook consumer
    return {
      inputText,
      setInputText,
      searchResults,
    };
  };
  const useSearchAlias = () => useDebouncedSearch(text => props.getAddressFromAlias(text))


  const [aliasToAddress, setaliasToAddress] = useState(true);
  const [inputAlias, setInputAlias] = useState("");
  // const [inputAliasETH, setInputAliasETH] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  useEffect(() => {
    setaliasToAddress(true)
    props.setOutputAddress("")
  }, [props.task]);
  const { inputText, setInputText } = useSearchAlias();

  const inquire = async () => {

    let payload = aliasToAddress ? inputAlias : inputAddress;
    if (!!!payload) {
      alert("Empty Payload");
      return;
    }
    if (aliasToAddress) {
      props.getAddressFromAlias(payload)

    } else {
      props.getAliasFromAddress(payload)

    }
  }
  const send = async () => {
    let amount = inputAmount;
    let rec_alias = inputText;

    if (!!!amount || !!!rec_alias)
      alert("Empty Payload");
    else if (amount <= 0)
      alert("Error in Input");
    else if (props.outputAddress === "" || props.outputAddress === nullAddress)
      alert("Alias does not exist");
    else if (props.user.balance < amount)
      alert("Insufficient Balance");
    else{
      props.sendEthToAlias(rec_alias, `${amount}`, setInputText, setInputAmount);
    }

  }



  const handleAmountChange = (e) => {
    let value;
    if (e.target.value === "")
      setInputAmount("")
    else if (e.target.value[e.target.value.length - 1] === "." && e.target.value.substr(0, e.target.value.length - 1).indexOf('.') === -1)
      setInputAmount(e.target.value);
    else {
      value = parseFloat(e.target.value);
      if (!!value)
        setInputAmount(value);
    }
  };

  const swapfields = () => {
    if (props.task === "Inquiry") {
      setaliasToAddress(!aliasToAddress)
    } else {
      setaliasToAddress(true)
    }
    props.setOutputAddress("");
  }
  return (
    <div className="swap-container">
      <div className="swap-contain">
        <div className="swap-contain_top">
          <div>{`${props.task === "Inquiry" ? "Alias Inquiry" : "Send Ether"}`}</div>
          <SettingsIcon />
        </div>
        <div className="swap-contain-top">
          <div className="swap_input-contain">
            {
              aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">
                    {
                      props.task === "Send" &&
                      <img src={EthIcon} width={24} alt="" />
                    }
                    <span>{`${props.task === "Inquiry" ? "Alias" : "ETH"}`}</span>
                  </div>
                  {props.task === "Send" ?
                    <input
                      placeholder="0.0"
                      value={inputAmount}
                      className="swap_value"
                      onChange={handleAmountChange}
                    /> :
                    <input
                      placeholder="@john_doe"
                      value={inputAlias}
                      className="swap_value"
                      onChange={(e) => setInputAlias(e.target.value)}

                    />
                  }

                </div>
              </div>
            }
            {
              !aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">{`${props.task === "Inquiry" ? "Address" : "Alias"}`}</div>
                  <input
                    placeholder={`${props.task === "Inquiry" ? "0x27ae23dEA" : "@john_doe"}`}
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                    className="swap_value" />
                </div>
              </div>
            }
            <div className="middleArrow" onClick={() => swapfields()}>
              <ArrowDown />
            </div>
            {
              !aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">
                    {
                      props.task === "Send" &&
                      <img src={EthIcon} width={24} alt="" />
                    }
                    <span>{`${props.task === "Inquiry" ? "Alias" : "ETH"}`}</span>
                  </div>
                  <input
                    placeholder="@john_doe"
                    value={props.outputAlias}
                    readOnly="readonly"
                    className="swap_value" />
                </div>
              </div>
            }
            {
              aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">{`${props.task === "Inquiry" ? "Address" : "Alias"}`}</div>

                  {props.task === "Inquiry" ?
                    <input
                      placeholder="0x27ae23dEA"
                      value={props.outputAddress}
                      readOnly="readonly"
                      className="swap_value" /> :
                    <> <input
                      placeholder="@john_doe"
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      className="swap_value" />
                      {props.outputAddress !== "" && props.outputAddress !== nullAddress && <div
                        style={{
                          position: "absolute",
                          bottom: "12px"
                        }}>{props.outputAddress}</div>}
                    </>

                  }



                </div>
              </div>
            }
          </div>

          {!props.connected && <div className="connect-btn" onClick={props.connectWalletHandler}>Connect wallet</div>}
          {props.connected && <div className="connected-btn" onClick={props.task === "Inquiry" ? inquire : send}>{`${props.task === "Inquiry" ? "Check" : "Send"}`}</div>}
        </div>
      </div>
    </div>
  );
}

export default Swap;
