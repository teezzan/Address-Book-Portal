import React from "react";
import "./nav.css";
import Icon from "../images/icon.svg";
function nav() {
  return (
    <div className="nav-bar">
      <div className="internal-nav">
        <a href="." className="logo">
          <div>
            <img src={Icon} width={25} alt={"l"} />
          </div>
        </a>
        <div className="mid-pill">
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
        <div className="network-add">
          <div className="network">ntw</div>
          <div className="network">
            <div>
              <div className="amount">6.13 ETH</div>
            </div>
          </div>
          <div className="network">opt</div>
        </div>
      </div>
    </div>
  );
}

export default nav;
