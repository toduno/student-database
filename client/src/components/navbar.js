//navigation bar that will link us to the required components 


import React, { useState, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { FaBars }  from 'react-icons/fa';
import { FaTimes }  from 'react-icons/fa';


export default function Navbar() {
    const navItemStyle = 'p-2 md:p-3 hover:font-semibold hover:text-red-400 active:text-red-600'

    const navigate = useNavigate()
    const [username, setUsername] = useState(null)
    const [userImage, setUserImage] = useState(null)
    const [navbar, setNavbar] = useState(false)


    async function logout() {
        localStorage.removeItem("token")
        await navigate('/login')
    }

    useLayoutEffect(() => {
        fetch('http://localhost:7000/isuserauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username) && setUserImage(data.photo) : null)
        .catch(err => alert(err))
    }, [])


    return (
        <header className='w-full bg-white z-30 sticky top-0 right-0 shadow-sm'>

            <nav>
                <div className='justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex justify md:px-8'>
                    <div>
                        <div className='flex items-center justify-between md:block'>
                            <NavLink to='/' className='font-bold text-2xl py-2 md:py-3 text-red-500 hover:text-red-400 active:text-red-700'>
                                    StudDB
                            </NavLink>
                            
                            <div className='md:hidden'>
                                <button onClick={() => setNavbar(!navbar)}
                                    className="p-1 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border">
                                    {navbar ? (
                                        <FaTimes className='w-5 h-5' />
                                    ) : (
                                        <FaBars className='w-5 h-5' />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`flex-1 justify-self-center pb-3 mt-4 md:block md:pb-0 md:mt-0 ${navbar?'block':'hidden'}`}>
                            <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'> 
                                    {username
                                        ? 
                                        <ul className='flex flex-col gap-y-4 md:flex-row md:gap-x-7'>
                                            <NavLink to='/dashboard' className={navItemStyle}>Dashboard</NavLink>
                                            <NavLink to={'/u/' + username} className={`flex ${navItemStyle}`}>
                                                <img src={`http://localhost:7000/uploads/${userImage}`} alt={username} />
                                                <span>{username}</span>
                                            </NavLink>
                                            <NavLink to='/records' className={navItemStyle}>My Record</NavLink>
                                            <NavLink to='/create' className={navItemStyle}>Create Record</NavLink>
                                            <NavLink to='/analytics' className={navItemStyle}>Analytics</NavLink>

                                            <li className={navItemStyle} onClick={logout}>Logout</li>
                                        </ul>
                                        : 
                                        <div className='flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-7'>
                                            <NavLink to='/'  className={navItemStyle}>
                                                Home
                                            </NavLink>
                                            <NavLink to='/register' className={`inline ${navItemStyle}`}>Register</NavLink>
                                            <NavLink to='/login' className={`inline ${navItemStyle}`}>Login</NavLink>
                                        </div>
                                    }
                            </ul>
                        </div>
                    </div>
                </div>   
            </nav>
        </header>
    )
}
