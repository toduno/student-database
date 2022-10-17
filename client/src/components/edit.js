//To serve as an editing component for our records - it will use a similar layout to the 'create' component and will
//eventually submit an update command to our server


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router'; 


export default function Edit() {
    const [form, setForm] = useState({
        photo: '',
        firstName: '',
        lastName: '',
        email: '',
        socials: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: '',
        },
        interest: '',
        graduationYear: ''
    })

    const params = useParams()
    const navigate = useNavigate()
    

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString() 

            //get the response
            const response = await fetch(`http://localhost:7000/record/${id}`)
            if(!response.ok) return window.alert(`An error has occurred: ${response.statusText}`)

            const record = await response.json()
            if(!record) {
                window.alert(`An error has occurred: ${response.statusText}`)
                //navigate back to default or home page 
                navigate('/')
                return
            }

            setForm(record)
        }
        fetchData()
        return
    }, [params.id, navigate]) 


    const updateForm = (value) => {
        return setForm(prev => {
            return {...prev, ...value}  
        })
    }

    const updateSocials = (value) => {
        //const {name, value} = e.target
        return setForm(prev => {
            // return {...prev, socials: JSON.stringify({...JSON.parse(prev.socials), ...value})}
            return {...prev, socials: {...prev.socials, ...value}} 
        })
    }

    const handlePhoto = (e) => {
        setForm({...form, photo: e.target.files[0]})
    }

    
    async function onSubmit(e) {
        e.preventDefault()

        //when a post request is sent to the 'create' url, add a new record to the database
        const editedPerson = {
            photo: form.photo,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            socials: {
                facebook: form.socials.facebook,
                twitter: form.socials.twitter,
                instagram: form.socials.instagram,
                linkedin: form.socials.linkedin
            },
            interest: form.interest,
            graduationYear: form.graduationYear
        }

        
        const formData  = new FormData();
        for(const prop in form) {
            formData.append(prop, prop !== 'socials' ? form[prop]: JSON.stringify(form[prop]));
        }

        await fetch(`http://localhost:7000/update/${params.id}`, {
            method: 'PUT',
            body: JSON.Stringify(editedPerson)
            //body: formData
            })

        console.log(editedPerson)
        navigate('/')
    }

    const {socials: {facebook, twitter, instagram, linkedin}} = form
    
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='flex md:flex-col md:w-[50%] md:h-screen justify-center items-center py-20 md:py-14  lg:py-20 bg-yellow-100 gap-y-3'>
                <div className="w-auto m-auto h-full -rotate-2 z-20">
                    <p className="w-auto m-auto bg-blue-700 text-white text-2xl font-semibold p-6 md:p-8 lg:p-14 pb-6 text-left shadow-xl">"Knowledge isn't power until it is applied." 
                        <small className='block text-xs text-right mt-6'>~ Dale Carnegie</small>
                    </p>
                </div>
                <div className="hidden md:block m-auto h-full rotate-2 z-10">
                    <p className="w-auto m-auto bg-red-600 text-white text-2xl font-semibold p-6 md:p-8 lg:p-14 pb-6 text-left shadow-xl">"Once you stop learning, you start dying." 
                        <small className='block text-xs text-right mt-6'>~ Albert Einsten</small>
                    </p>
                </div>
                <div className="hidden md:block m-auto h-full -rotate-2 z-20">
                    <p className="w-auto m-auto bg-yellow-300 text-2xl font-semibold p-6 md:p-8 lg:p-14 pb-6 text-left shadow-xl">"Always desire to learn something useful." 
                        <small className='block text-xs text-right mt-6'>~ Sophocles</small>
                    </p>
                </div>
            </div>            

            <div className='flex flex-col items-center justify-center px-2 md:pl-7 py-7 md:pt-4 md:pb-8 md:w-[50%]'>
                <div className='self-start'>
                    <h3 className='font-bold text-2xl md:text-3xl mb-6'>Update Record</h3>
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
                        <label>Social Networking Profiles</label>
                        <div className='flex gap-x-4 mt-1'>
                            <div className='w-full'>
                                <div className='w-full mb-2'>
                                    <input placeholder='https://www.facebook.com/user' type='text' id='facebook' value={facebook} onChange={(e) => updateSocials({facebook: e.target.value})} 
                                        className='bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 w-full block rounded-sm'/>
                                    <label htmlFor='facebook' className='text-xs text-slate-600'>Facebook</label>
                                </div>
                                <div className='w-full'>
                                    <input placeholder='https://www.twitter.com/user' type='text' id='twitter' value={twitter} onChange={(e) => updateSocials({twitter: e.target.value})} 
                                        className='bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 w-full block rounded-sm'/>
                                    <label htmlFor='twitter' className='text-xs text-slate-600'>Twitter</label>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='w-full mb-2'>
                                    <input placeholder='https://www.instagram.com/user' type='text' id='instagram' value={instagram} onChange={(e) => updateSocials({instagram: e.target.value})} 
                                        className='bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 w-full block rounded-sm'/>
                                    <label htmlFor='instagram' className='text-xs text-slate-600'>Instagram</label>
                                </div>
                                <div className='w-full'>
                                    <input placeholder='https://www.linkedin.com/user' type='text' id='linkedin' value={linkedin} onChange={(e) => updateSocials({linkedin: e.target.value})} 
                                        className='bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 w-full block rounded-sm'/>
                                    <label htmlFor='linkedin' className='text-xs text-slate-600'>LinkedIn</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='interest'>Interest</label>
                        <input placeholder='ex: DevOps' type='text' id='interest' value={form.interest} onChange={(e) => updateForm({interest: e.target.value})} 
                            className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                    </div>

                    <div>
                        <label htmlFor='year'>Graduation Year</label>
                        <input placeholder='ex: 2022' type='number' id='year' value={form.graduationYear} onChange={(e) => updateForm({graduationYear: e.target.value})} 
                            className='mt-1 bg-gray-100 hover:bg-blue-100 py-1 px-2 md:py-2 block w-full rounded-sm'/>
                    </div>

                    <div>
                        <label htmlFor='name'>Upload Photo</label>
                        <input type='file' accept=".png, .jpg, .jpeg" id='photo' name='photo' 
                            onChange={handlePhoto}  className='block mt-1'/>
                    </div>

                    <div>
                        <input type='submit' value="Update student" className='md:mt-2 font-semibold bg-blue-700 hover:bg-blue-600 px-4 md:px-8 py-2 text-white' />
                    </div>
                </form>
            </div>
        </div>
    )
}