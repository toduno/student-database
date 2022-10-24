import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import ValidationError from '../components/validationError'
import { FaFacebookF, FaGoogle, FaGithub } from 'react-icons/fa';


export default function SignIn() {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()


    const updateForm = (value) => {
        return setForm(prev => {
            return {...prev, ...value}  
        })
    }

    async function onSubmit(e) {
        e.preventDefault()

        const loginData = {...form}

        try{
           const res =  await fetch(`http://localhost:7000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            const data = await res.json()
            localStorage.setItem('token', data.token)
            setErrorMessage(data.message)
        } catch(err) {
            setErrorMessage(err)
        }

        setForm('/')
    }

    useLayoutEffect(() => {
       function authenticateUser() {
            fetch('http://localhost:7000/isUserAuth', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? navigate('/create') : null)  //.push('/dashboard')
            .catch(err => setErrorMessage(err))
       }
       authenticateUser()

       return
    }, [navigate])


    return (
        <div >
            <button onClick={() => setShowModal(true)} className='p-2 md:p-3 hover:font-semibold hover:border-red-700 hover:border-b-2 hover:text-red-400'>
                 Sign In
            </button>

            {showModal ? (
                <>
                    <div className='fixed inset-0 z-10 overflow-y-auto '>
                        <div onClick={() =>setShowModal(false)} className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
                        
                        <div className='flex justify-center items-center min-h-screen'>
                            <div className='relative w-full max-w-lg p-4 mx-auto '>
                            <div className='mt-3 sm:flex bg-white rounded-md shadow-lg'> 
                                
                                  <div className='w-full mt-2 px-4 md:px-5 py-2 pt-5 md:pt-1 md:pb-2 md:mt-0'>
                                        <div className='self-start mb-4'>
                                            <h3 className='font-bold text-2xl md:text-3xl md:mt-4'>Sign In</h3>
                                            <div className='flex items-center justify-center my-6 gap-x-7'>
                                                <span className='bg-black hover:bg-gray-700 p-3 rounded-full'><FaGithub className='text-center text-white' /></span>
                                                <span className='bg-red-700 hover:bg-red-600 p-3 rounded-full'><FaGoogle className='text-center text-white' /></span>
                                                <span className='bg-blue-700 hover:bg-blue-600 p-3 rounded-full'><FaFacebookF className='text-center text-white' /></span>
                                            </div>
                                            <div className='border-b-[1px] w-full leading-[0.25em] text-center mb-0 mx-0'><span className='bg-white py-0 px-4'>or</span></div>
                                        </div>

                                        <form onSubmit={onSubmit} className='w-full flex flex-col gap-y-4 md:gap-y-5'>
                                            <div>
                                                <label htmlFor='username'>Username</label>
                                                <input type='text' id='username' value={form.username} onChange={(e) => updateForm({username: e.target.value})} 
                                                    className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                                            </div>

                                            <div>
                                                <label htmlFor='password'>Password</label>
                                                <input type='password' id='password' value={form.password} onChange={(e) => updateForm({password: e.target.value})} 
                                                    className='mb-1 mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                                                <span className='text-blue-700 hover:text-blue-500 visited:text-purple-700bactive:text-red-700 underline'>Forgot Password?</span>
                                            </div>

                                            <div className='flex justify-between'>
                                                <div>
                                                    <input type='submit' value="Log in" className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-8 py-2 text-white' />
                                                </div>      
                                                <div>                                          
                                                    <button className='md:mt-2 font-semibold bg-red-700 hover:bg-red-600 px-4 md:px-8 py-2 text-white'
                                                        onClick={() => setShowModal(false)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>

                                            <div className='flex'>
                                                <span>Don't have an account?</span>
                                                <Link onClick={()=> setShowModal(false)} to='/signup' className='font-semibold ml-2 text-blue-700 hover:text-blue-500 visited:text-purple-700 active:text-red-700'>Sign Up</Link>
                                            </div>

                                            {!errorMessage ? navigate('/create') : <ValidationError message={errorMessage} />}
                                        </form>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )  
}







