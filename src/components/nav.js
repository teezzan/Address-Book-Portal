import React from 'react';
import './nav.css';
import icon from '../images/icon.svg'
function nav() {
    return (
        <div className="nav-bar">
            <div className="internal-nav">
                <a href="." className='logo'>
                    <div>
                        <img src={icon} alt={"l"} />
                    </div>
                </a>
                <div className="mid-pill">
                    <a class="pill ACTIVE" href="#/swap" aria-current="page">Swap</a>
                    <a class="pill" id="pool-nav-link" href="#/pool">Pool</a>
                    <a class="pill" id="pool-nav-link" href="#/pool">Charts<sup>↗</sup></a>
                </div>
                <div>
                    <div>
                        ntw
                    </div>
                    <div>
                        add
                    </div>
                    <div>
                        opt
                    </div>
                </div>
            </div>
        </div>
    );
}

export default nav;