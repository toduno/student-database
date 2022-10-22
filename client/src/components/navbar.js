//navigation bar that will link us to the required components 


import React, { useState, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import SignUp from '../modal/signup';
import SignIn from '../modal/login';


export default function Navbar() {

    const navigate = useNavigate()
    const [username, setUsername] = useState(null)


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
        <header className='bg-white z-30 sticky top-0 right-0 shadow-sm'>
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
                    <ul className='flex justify-between items-center'>
                        <li className='p-2 md:p-3 hover:font-semibold hover:border-red-700 hover:border-b-2 hover:text-red-400 visited:text-purple-600 active:text-red-600'>
                         <NavLink to='/'>Home</NavLink>
                        </li>
                        
                         {username
                            ? <ul className='flex'>
                                <NavLink to={'/u/' + username}>Profile</NavLink>
                                <li className='p-2 md:p-3 hover:font-semibold hover:border-red-700 hover:border-b-2 hover:text-red-400 visited:text-purple-600 active:text-red-600'>
                                    <NavLink to='/create'>Create Record</NavLink>
                                </li>
                                <li className='p-2' onClick={logout}>Logout</li>
                              </ul>
                            : <ul className='flex'>
                                <li><SignUp /></li>
                                <li><SignIn /></li>
                              </ul>
                        }
                    </ul>
            </nav>
        </header>
    )
}