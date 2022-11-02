//navigation bar that will link us to the required components 


import React, { useState, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import SignUp from '../modal/signup';
import SignIn from '../modal/login';
import { FaBars }  from 'react-icons/fa';
import { FaTimes }  from 'react-icons/fa';


export default function Navbar() {

    const navigate = useNavigate()
    const [username, setUsername] = useState(null)
    //const [userImage, setUserImage] = useState(null)
    const [navbar, setNavbar] = useState(false)


    async function logout() {
        localStorage.removeItem("token")
        await navigate('/login')
    }

    useLayoutEffect(() => {
        fetch('http://localhost:7000/isUserAuth', {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username) : null)
        .catch(err => alert(err))
    }, [])


    return (
        <header className='w-full bg-white z-30 sticky top-0 right-0 shadow-sm'>
            {/* <nav>
                <ul>
                    <li className='p-2 md:p-3 hover:font-semibold hover:border-red-700 hover:border-b-2 hover:text-red-400 visited:text-purple-600 active:text-red-600'>
                         <NavLink to='/'>Home</NavLink>
                    </li>
                    <li className='p-2 md:p-3 hover:font-semibold hover:border-red-700 hover:border-b-2 hover:text-red-400 visited:text-purple-600 active:text-red-600'>
                        <NavLink to='/create'>Create Record</NavLink>
                    </li>
                    {username
                        ? <ul>
                            <NavLink to={'/u/' + username}>Profile</NavLink>
                            <li className='' onClick={logout}>Logout</li>
                          </ul>
                        : <ul>
                            <li>
                                <NavLink to='/login'>Login</NavLink>
                            </li>
                            <li>
                                <NavLink to='/signup'>Register</NavLink>
                            </li>
                          </ul>
                    }
                </ul>
            </nav> */}

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
                                        ? <ul className='md:flex gap-y-3'>
                                            <NavLink to={'/u/' + username}>
                                                {/* <img src={userImage} alt={username} /> */}
                                                <span className='text-2xl'>Profile</span>
                                            </NavLink>
                                            <li className='p-2 md:p-3 hover:font-semibold hover:border-red-700 hover:border-b-2 hover:text-red-400 visited:text-purple-600 active:text-red-600'>
                                                <NavLink to='/create'>Create Record</NavLink>
                                            </li>
                                            <li className='p-2' onClick={logout}>Logout</li>
                                        </ul>
                                        : 
                                        <div className='flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-7'>
                                            <NavLink to='/'  className='p-2 md:p-3 hover:font-semibold hover:text-red-400  active:text-red-600'>
                                                Home
                                            </NavLink>
                                            <SignUp className='inline'/>
                                            <SignIn className='inline' />   
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