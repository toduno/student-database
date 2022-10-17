//To serve as a viewing component for our records - it will fetch all the records in our database through a GET method


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import SearchRecord from './search';

import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'


//Record component
const Record = (props) => {
    const [show, setShow] = useState()

    let btnText = show ?'Hide' : 'View'
    
    const onClick = () => {
        return setShow(!show)
    }

    return (
        <tr className='border-b-gray-200 border-b-2 border-x-2'>
            <td className='px-4 py-1 md:py-2'>  
                { 
                !<img src={`http://localhost:7000/uploads/${props.record.photo}`} alt='student'
                className='rounded-full h-12 w-12'/> 
                ?  
                <svg className='w-12 h-12' fill='currentColor' viewBox='0 0 20 20' 
                xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd'
                d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clip-rule='evenodd'></path></svg>
                :
                <img src={`http://localhost:7000/uploads/${props.record.photo}`} alt='student'
                    className='rounded-full h-10 w-10 md:h-12 md:w-12'/>
                }    
            </td>
            <td className='px-4 py-1 md:py-2'>{props.record.firstName}</td>
            <td className='px-4 py-1 md:py-2'>{props.record.lastName}</td>
            <td className='px-4 py-1 md:py-2'>{props.record.email}</td>
            <td className='px-4 py-1 md:py-2'>
                <div onClick={onClick} >
                    <button className='mb-2 font-semibold hover:text-blue-600 visited:text-red-700 border-[1px] border-b-0 border-blue-600 px-2 pb-0 shadow-inner'>{btnText}</button> 
                    {show ?
                    <ul className='sticky top-0'>
                        <li className='block'><FaFacebookF className='inline text-blue-800'/>: {props.record.socials.facebook}</li>
                        <li className='block'><FaTwitter className='inline text-blue-800'/>: {props.record.socials.twitter}</li>
                        <li className='block'><FaInstagram className='inline text-red-800'/>: {props.record.socials.instagram}</li>
                        <li className='block'><FaLinkedin className='inline text-blue-800'/>: {props.record.socials.linkedin}</li>
                    </ul> : false }
                </div>
            </td>
            <td className='px-4 py-1 md:py-2'>{props.record.interest}</td>
            <td className='px-4 py-1 md:py-2'>{props.record.graduationYear}</td>
            <td className='px-4 py-1 md:py-2'>
                <Link to={`/edit/${props.record._id}`} className='font-semibold underline text-blue-800 hover:text-blue-600 hover:text-lg visited:text-purple-700 active:text-blue-300'>Edit</Link> | 
                <button onClick={() => {props.deleteRecord(props.record._id)}} className='font-semibold text-red-800 hover:text-red-600 hover:text-lg'>Delete</button>
            </td>
        </tr>
    )
}


//RecordList component 
export default function RecordList() {
    const [records, setRecords] = useState([])
    
    useEffect(() => {
        async function getRecords() {
            //get the response
            const response = await fetch(`http://localhost:7000/record/`)
            if(!response.ok) return window.alert(`An error has occurred: ${response.statusText}`)

            const records = await response.json()
           
            //set the records state with the response data
            setRecords(records)
        }
        getRecords()

        return
    }, [records.length]) 


    async function deleteRecord(id) {
        await fetch(`http://localhost:7000/${id}`, {
            method: "DELETE"
        })

        //get the element whose id is not equal to the url's
        const newRecords = records.filter((el) => el._id !== id)

        //update the records state
        setRecords(newRecords)
    }

    const recordList = () => {
        return records.map(record => {
            return (
                <Record record={record}  deleteRecord={() => deleteRecord(record._id)}  key={record._id} />
            )
        })
    }

    return (
        <div>
            <h3 className="font-semibold text-2xl md:text-3xl my-4 text-center">Students Record</h3>

            <SearchRecord records={records} setRecords={setRecords} />
            
            <div className='container mx-auto shadow-sm'>
                <table className='min-w-full leading-normal'>
                    <thead>
                        <tr className='text-left bg-blue-700 text-white text-md tracking-wide'>
                            <th className='px-4 py-2 md:py-3 w-0 md:text-lg'>Photo</th>
                            <th className='px-4 py-2 md:py-3 md:text-lg'>First Name</th>
                            <th className='px-4 py-2 md:py-3 md:text-lg'>Last Name</th>
                            <th className='px-4 py-2 md:py-3 md:text-lg'>Email</th>
                            <th className='px-4 py-2 md:py-3 md:text-lg'>Socials</th>
                            <th className='px-4 py-2 md:py-3 md:text-lg'>Interest</th>
                            <th className='px-4 py-2 md:py-3 md:text-lg'>Graduation Year</th>
                            <th className='px-4 py-2 md:py-3 md:text-lg'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>{recordList()}</tbody>
                </table> 
            </div>
        </div>
    )
}
