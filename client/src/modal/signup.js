
import React, { useState } from 'react';
//import { useParams } from 'react-router'; 


export default function SignUp({setOpenModal}) {
    const [form, setForm] = useState({
        photo: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const updateForm = (value) => {
        return setForm(prev => {
            return {...prev, ...value}  
        })
    }

    const handlePhoto = (e) => {
        setForm({...form, photo: e.target.files[0]})
    }

    async function onSubmit(e) {
        e.preventDefault()

        const formData = {...form}

        await fetch(`http://localhost:7000/record/admin`, {
            method: 'POST',
            body: JSON.Stringify(formData)
            })

        console.log(formData)
    }


    return (
                <>
                    <div className='fixed inset-0 z-10 overflow-y-auto '>
                        {/* <div onClick={() =>setShowModal(false)} className='fixed inset-0 w-full h-full bg-black opacity-40'></div> */}
                        
                        <div className='flex justify-center items-center min-h-screen'>
                            <div clssName='relative w-full max-w-lg p-4 mx-auto'>
                                <div className='-mt-8 md:mt-10 sm:flex bg-white rounded-lg shadow-2xl'> 
                                
                                  <div className='mt-2 px-5 md:px-6 py-7 pt-5 md:pt-1 md:pb-8 md:mt-0'>
                                        <div className='self-start border-b-[1px] mb-4'>
                                            <h3 className='font-bold text-2xl md:text-3xl md:mt-4'>Sign Up</h3>
                                            <p className='text-gray-500 mt-3 mb-4'>Please fill in this form to create an account!</p>
                                        </div>

                                        <form onSubmit={onSubmit} encType='multipart/form-data' className='w-full flex flex-col gap-y-4 md:gap-y-5'>
                                            <div className='flex gap-x-4 w-full'>
                                                <div className='w-full'>                           
                                                    <label htmlFor='fname'>First Name</label>
                                                    <input placeholder='Enter your first name' type='text' id='fname' value={form.firstName} onChange={(e) => updateForm({firstName: e.target.value})} 
                                                        className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 w-full block rounded'/>
                                                </div>

                                                <div className='w-full'>
                                                    <label htmlFor='lname'>Last Name</label>
                                                    <input placeholder='Enter your surname' type='text' id='lname' value={form.lastName} onChange={(e) => updateForm({lastName: e.target.value})} 
                                                        className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor='email'>Email Address</label>
                                                <input placeholder='ex: email@address.com' type='email' id='email' value={form.email} onChange={(e) => updateForm({email: e.target.value})} 
                                                    className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                                            </div>

                                            <div>
                                                <label htmlFor='password'>Password</label>
                                                <input type='text' id='password' value={form.password} onChange={(e) => updateForm({interest: e.target.value})} 
                                                    className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                                            </div>

                                            <div>
                                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                                <input type='number' id='confirmPassword' value={form.confirmPassword} onChange={(e) => updateForm({graduationYear: e.target.value})} 
                                                    className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                                            </div>

                                            <div>
                                                <label htmlFor='name'>Upload Photo</label>
                                                <input type='file' accept=".png, .jpg, .jpeg" id='photo' name='photo' 
                                                    onChange={handlePhoto}  className='block mt-1'/>
                                            </div>

                                            <div className='flex justify-between'>
                                                <div>
                                                    <input type='submit' value="Create account" className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-8 py-2 text-white' />
                                                </div>
                                                <div>
                                                    <button className='md:mt-2 font-semibold bg-red-700 hover:bg-red-600 px-12 md:px-16 py-2 text-white'
                                                        onClick={() => setOpenModal(false)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </>
          
             )
}


