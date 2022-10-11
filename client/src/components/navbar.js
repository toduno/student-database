//navigation bar that will link us to the required components 


import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Navbar() {
    return (
        <div>
            <nav>
                <NavLink to='/'></NavLink>
                <button>
                    <span></span>
                </button>

                <div>
                    <ul>
                        <li>
                            <NavLink to='/create'>Create Record</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}