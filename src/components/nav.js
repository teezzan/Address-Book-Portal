import React, { useState } from "react";
import "./nav.css";
import Icon from "../images/icon.svg";
import Modal from 'simple-react-modal'
import { Account, Copy, View } from "./Icons";

function Nav(props) {
  const [show, setShow] = useState(false)

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
              <div className="pill" id="pool-nav-link" href="#/pool" onClick={() => setShow(!show)}>
                {props.user.address}
              </div>
              <div className="pill" id="pool-nav-link" href="#/pool">
                {props.user.balance} ETH
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onClose={() => setShow(!show)} className="themodal">
        <div className="modal__content">

          <div className="content__top">

            <div>
              Account
            </div>
            <div
              onClick={() => setShow(!show)}

              style={{
                cursor: "pointer"
              }}
            >
              <Account />

            </div>
          </div>

          <div className="modal__account">

            <div className="modal__account-contain">
              <div className="contain__item">
                <div className="contain__item-first">
                <input
                    placeholder="0.0"
                    className="modal-input"
                  />
                </div>


                <div className="contain__item-sec">
                  Change
                </div>
              </div>
              <div className="contain__item addr">
                <div className="addr">
                  0x6D5F...F69E
                </div>
              </div>
              <div className="contain__item">
                <div className="copy_addr">
                  <Copy /> Copy Address
                </div>

                <div className="view_addr">
                  <View />View on Explorer
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Nav;
