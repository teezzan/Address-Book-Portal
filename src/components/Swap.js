import React, { useState, useEffect } from "react";
import "./swap.css";
import { ArrowDown, SettingsIcon } from "./Icons";
import EthIcon from "../images/download.png";
function Swap(props) {
  const [aliasToAddress, setaliasToAddress] = useState(true);
  const [inputAlias, setInputAlias] = useState("");
  const [inputAliasETH, setInputAliasETH] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  useEffect(() => { setaliasToAddress(true) }, [props.task]);

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

  const swapfields = () => {
    if (props.task === "Inquiry") {
      setaliasToAddress(!aliasToAddress)
    } else {
      setaliasToAddress(true)
    }
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
                      onChange={(e) => setInputAmount(e.target.value)}
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
                    <input
                      placeholder="@john_doe"
                      value={inputAliasETH}
                      onChange={(e) => setInputAliasETH(e.target.value)}
                      className="swap_value" />}

                </div>
              </div>
            }
          </div>

          {!props.connected && <div className="connect-btn" onClick={props.connectWalletHandler}>Connect wallet</div>}
          {props.connected && <div className="connected-btn" onClick={inquire}>{`${props.task === "Inquiry" ? "Check" : "Send"}`}</div>}
        </div>
      </div>
    </div>
  );
}

export default Swap;
