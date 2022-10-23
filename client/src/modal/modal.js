// import React, { useState } from 'react';
// import SignUp from './signup'
// import SignIn from './login'


// export default function Modal() {
//     const [showModal, setShowModal] = (false)
//     const [isSignup, toggleSignup] = useState(false)
//     //const [isSignin, toggleSignin] = useState(false)

    
//     return (
//         <div >
//             <button onClick={() => setShowModal(true)} className='p-2 md:p-3 hover:font-semibold hover:border-red-700 hover:border-b-4 hover:text-red-400'>
//                 Create
//             </button>

//             {showModal &&
//                 <div>
                    
//                     <button onClick={() => toggleSigninModal(true)}>Sign In</button>
//                      {isSigninModalOpen ? <SignIn setOpenModal={setShowModal} /> : null}
                     
//                      <button onClick={() => toggleSignupModal(true)}>Sign Up</button>
//                      {isSignupModalOpen ? <SignUp setOpenModal={setShowModal} /> : null}
//                 </div>     
//             }
//         </div>
//     )
// }