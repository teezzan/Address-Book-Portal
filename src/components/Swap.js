import React, { useState } from "react";
import "./swap.css";
import { ArrowDown, SettingsIcon } from "./Icons";
import EthIcon from "../images/download.png";
function Swap() {
  const [aliasToAddress, setaliasToAddress] = useState(true);
  const [connected, setConnected] = useState(false);

  const swapfields = () => {
    setaliasToAddress(!aliasToAddress)
  }
  return (
    <div className="swap-container">
      <div className="swap-contain">
        <div className="swap-contain_top">
          <div>Inquiry</div>
          <SettingsIcon />
        </div>
        <div className="swap-contain-top">
          <div className="swap_input-contain">
            {
              aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">
                    <img src={EthIcon} width={24} alt="" />
                    <span>ETH</span>
                  </div>

                  <input placeholder="0.0" className="swap_value" />
                </div>
              </div>
            }
            {
              !aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">ETH</div>
                  <input placeholder="0.0" className="swap_value" />
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
                    <img src={EthIcon} width={24} alt="" />
                    <span>ETH</span>
                  </div>

                  <input placeholder="0.0" className="swap_value" />
                </div>
              </div>
            }
            {
              aliasToAddress &&

              <div className="swap_input">
                <div className="swap-internal">
                  <div className="swap_token">ETH</div>
                  <input placeholder="0.0" className="swap_value" />
                </div>
              </div>
            }
          </div>

          {!connected && <div className="connect-btn" onClick={()=>{setConnected(true)}}>Connect wallet</div>}
          {connected && <div className="connected-btn">Check</div>}
        </div>
      </div>
    </div>
  );
}

export default Swap;
