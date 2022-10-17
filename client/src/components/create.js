//To serve as a creating component for our records - using this component, users can create a new record. The component 
//will submit a create command to our server


import React, { useState } from 'react';
import { useNavigate } from 'react-router'; 


export default function Create() {
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

    const navigate = useNavigate()


    const updateForm = (value) => {
        return setForm(prev => {
            return {...prev, ...value}  
        })
    }

    const updateSocials = (value) => {
        //const {name, value} = e.target
        return setForm(prev => {
            return {...prev, socials: {...prev.socials, ...value}} //using spread to get previous and new or set state/value
        })
    }

    const handlePhoto = (e) => {
        setForm({...form, photo: e.target.files[0]})
    }

    const formData  = new FormData();

    for(const prop in form) {
        formData.append(prop, prop !== 'socials' ? form[prop]: JSON.stringify(form[prop]));
    }

    async function onSubmit(e) {
        e.preventDefault()

        //when a post request is sent to the 'create' url, add a new record to the database
        const newPerson = {...form}

        await fetch('http://localhost:7000/record/add', {
            method: 'POST',
            body: formData
        })
        .catch(error => {
            window.alert(error)
            return
        })

        //reset the form after submission
        setForm({
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
        console.log(newPerson)

        navigate('/')
    }

    const {socials: {facebook, twitter, instagram, linkedin}} = form
    //const socials = {...form.socials}

    return (
        <div>
            <h3>Create New Student</h3>

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
                    <input type='submit' value="Create student" />
                </div>
            </form>
        </div>
    )
}
