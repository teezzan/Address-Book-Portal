import React from "react";
import "./swap.css";
import { ArrowDown, SettingsIcon } from "./Icons";
import EthIcon from "../images/download.png";
function Swap() {
  return (
    <div className="swap-container">
      <div className="swap-contain">
        <div className="swap-contain_top">
          <div>swap</div>
          <SettingsIcon />
        </div>
        <div className="swap-contain-top">
          <div className="swap_input-contain">
            <div className="swap_input">
              <div className="swap-internal">
                <div className="swap_token">
                  <img src={EthIcon} width={24} alt="" />
                  <span>ETH</span>
                </div>

                <input placeholder="0.0" className="swap_value" />
                {/* <div className="swap_value">00:00</div> */}
              </div>
            </div>
            <div className="middleArrow">
              <ArrowDown />
            </div>
            <div className="swap_input">
              <div className="swap-internal">
                <div className="swap_token">ETH</div>

                {/* <div className="swap_value">00:00</div> */}
                <input placeholder="0.0" className="swap_value" />
              </div>
            </div>
          </div>

          <div className="connect-btn">Connect wallet</div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
