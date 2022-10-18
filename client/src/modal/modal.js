import React, { useState } from 'react';
import SignUp from './signup'
import SignIn from './login'


export default function Modal() {
    const [showModal, setShowModal] = useState(false)
    const [isSignupModalOpen, toggleSignupModal] = useState(false)
    const [isLoginModalOpen, toggleLoginModal] = useState(false)

    
    return (
        <div >
            <button onClick={() => setShowModal(true)} className='font-semibold hover:text-blue-600'>
                Sign Up/Sign In
            </button>

            {showModal &&
                <div className='flex'>
                    
                    <button onClick={() => toggleLoginModal(true)}>Sign In</button>
                     {isLoginModalOpen ? <SignIn setOpenModal={setShowModal} /> : null}
                     <button onClick={() => toggleSignupModal(true)}>Sign Up</button>
                     {isSignupModalOpen ? <SignUp setOpenModal={setShowModal} /> : null}
                </div>     
            }
        </div>
    )
}