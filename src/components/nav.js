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
                <div>
                    Swap Pool chart
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