//navigation bar that will link us to the required components 


import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Navbar() {
    return (
        <header className='bg-white z-30 sticky top-0 right-0 shadow-sm'>
            <nav className='p-2 md:p-3'>
                <div>
                    <ul className='flex justify-between items-center'>
                 <li className='font-semibold hover:text-lg md:text-lg hover:text-xl  hover:text-blue-700 visited:text-purple-600 active:text-red-600'>
                         <NavLink to='/'>Home</NavLink>
                        </li>
                        <li className='font-semibold hover:text-lg md:text-lg hover:text-xl  hover:text-blue-700 visited:text-purple-600 active:text-red-600'>
                            <NavLink to='/create'>Create Record</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}