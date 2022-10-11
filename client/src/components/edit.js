//To serve as an editing component for our records - it will use a similar layout to the 'create' component and will
//eventually submit an update command to our server


import React, { useState, useEffect } from 'react';
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
        graduationYear: '',
        //records: [] 
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
            return {...prev, socials: {...prev.socials, ...value}}
         })
    }

    const handlePhoto = (e) => {
        setForm({...form, photo: e.target.files[0]})
    }

    async function onSubmit(e) {
        e.preventDefault()

        //when a post request is sent to the 'update (by id)' url, we'll update the record in the database
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

        await fetch(`http://localhost:7000/update/${params.id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedPerson)
        })
        
        console.log(editedPerson) 
        navigate('/')   
    }

    const {socials: {facebook, twitter, instagram, linkedin}} = form
    
    return (
        <div>
            <h3>Update Student</h3>

            <form onSubmit={onSubmit} encType='multipart/form-data'>
                <div>
                    <label htmlFor='name'>Photo</label>
                    <input type='file' accept=".png, .jpg, .jpeg" id='photo' name='photo' 
                        onChange={handlePhoto} />
                </div>

                <div>
                    <label htmlFor='fname'>First name</label>
                    <input type='text' id='fname' value={form.firstName} onChange={(e) => updateForm({firstName: e.target.value})} />
                </div>

                 <div>
                    <label htmlFor='lname'>Last name</label>
                    <input type='text' id='lname' value={form.lastName} onChange={(e) => updateForm({lastName: e.target.value})} />
                </div>

                 <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' value={form.email} onChange={(e) => updateForm({email: e.target.value})} />
                </div>

                <div>
                    <label>Socials</label>
                    <div>
                        <label htmlFor='facebook'>Facebook</label>
                        <input type='text' id='facebook' value={facebook} onChange={(e) => updateSocials({facebook: e.target.value})} />
                        <label htmlFor='twitter'>Twitter</label>
                        <input type='text' id='twitter' value={twitter} onChange={(e) => updateSocials({twitter: e.target.value})} />
                        <label htmlFor='instagram'>Instagram</label>
                        <input type='text' id='instagram' value={instagram} onChange={(e) => updateSocials({instagram: e.target.value})} />
                        <label htmlFor='linkedin'>LinkedIn</label>
                        <input type='text' id='linkedin' value={linkedin} onChange={(e) => updateSocials({linkedin: e.target.value})} />
                    </div>
                </div>

                <div>
                    <label htmlFor='interest'>Interest</label>
                    <input type='text' id='interest' value={form.interest} onChange={(e) => updateForm({interest: e.target.value})} />
                </div>

                 <div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                    <label htmlFor='year'>Graduation year</label>
                    <input type='number' id='year' value={form.graduationYear} onChange={(e) => updateForm({graduationYear: e.target.value})} />
                </div>

                <div>
                    <input type='submit' value="Update student" />
                </div>
            </form>            
        </div>
    )
}

