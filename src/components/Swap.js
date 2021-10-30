import React, { useState, useEffect } from "react";
import "./swap.css";
import { ArrowDown, SettingsIcon } from "./Icons";
import EthIcon from "../images/download.png";
function Swap(props) {
  const [aliasToAddress, setaliasToAddress] = useState(true);
  useEffect(() => { setaliasToAddress(true) }, [props.task]);

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
          <div>{`${props.task === "Inquiry" ? "Innqury" : "Send Ether"}`}</div>
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
                  <input placeholder={`${props.task === "Inquiry" ? "@john_doe" : "0.0"}`} className="swap_value" />

                </div>
              </div>
            }
            {
              !aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">{`${props.task === "Inquiry" ? "Address" : "Alias"}`}</div>
                  <input placeholder={`${props.task === "Inquiry" ? "0x27ae23dEA" : "@john_doe"}`} className="swap_value" />
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

                  <input placeholder={`${props.task === "Inquiry" ? "@john_doe" : "0.0"}`} className="swap_value" />
                </div>
              </div>
            }
            {
              aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">{`${props.task === "Inquiry" ? "Address" : "Alias"}`}</div>
                  <input placeholder={`${props.task === "Inquiry" ? "0x27ae23dEA" : "@john_doe"}`} className="swap_value" />
                </div>
              </div>
            }
          </div>

          {!props.connected && <div className="connect-btn" onClick={() => { props.setConnected(true) }}>Connect wallet</div>}
          {props.connected && <div className="connected-btn">{`${props.task === "Inquiry" ? "Check" : "Send"}`}</div>}
        </div>
      </div>
    </div>
  );
}

export default Swap;
