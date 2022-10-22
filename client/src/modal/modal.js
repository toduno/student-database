// import React, { useState } from 'react';
// import SignUp from './signup'
// import SignIn from './login'


// export default function Modal() {
//     const [showModal, setShowModal] = useState(false)
//     const [isSignupModalOpen, toggleSignupModal] = useState(false)
//     const [isLoginModalOpen, toggleLoginModal] = useState(false)

    
//     return (
//         <div >
//             <button onClick={() => setShowModal(true)} className='p-2 md:p-3 hover:font-semibold hover:border-red-700 hover:border-b-4 hover:text-red-400'>
//                 Create Account
//             </button>

//             {showModal &&
//                 <div className='flex gap-x-3'>
                    
//                     <button onClick={() => toggleLoginModal(true)}>Sign In</button>
//                      {isLoginModalOpen ? <SignIn setOpenModal={setShowModal} /> : null}
                     
//                      <button onClick={() => toggleSignupModal(true)}>Sign Up</button>
//                      {isSignupModalOpen ? <SignUp setOpenModal={setShowModal} /> : null}
//                 </div>     
//             }
//         </div>
//     )
// }