import React, { useState } from "react";
import "./nav.css";
import Icon from "../images/icon.svg";


function Nav(props) {

  return (
    <>
      <div className="nav-bar">
        <div className="internal-nav">
          <a href="." className="logo">
            <div>
              <img src={Icon} width={25} alt={"l"} />
            </div>
          </a>
          <div className="mid-pill mid-nav" style={{
            transform: "translateX(135px)"
          }}>
            <a className={`${props.task === "Inquiry" ? "pill ACTIVE" : "pill"} `}
              href="#/inquiry"
              onClick={() => { props.setTask("Inquiry") }}
              aria-current="page">
              Inquiry
            </a>
            <a className={` ${props.task === "Send" ? "pill ACTIVE" : "pill"} `}
              id="pool-nav-link"
              onClick={() => { props.setTask("Send") }}
              href="#/send"
            >
              Send Ether
            </a>
            <a className="pill"
              id="pool-nav-link"
              href="https://github.com/teezzan/Adress-Book-Portal">
              Github<sup>↗</sup>
            </a>
          </div>
          <div className="network-add">
            <div className="mid-pill">
              <div className="pill ACTIVE" aria-current="page">
                @{props.user.alias}
              </div>
              <div className="pill" id="pool-nav-link" href="#/pool" onClick={() => props.setShow(!props.show)}>
                {props.user.address}
              </div>
              <div className="pill" id="pool-nav-link" href="#/pool">
                {props.user.balance} ETH
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}

export default Nav;
