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
                    className='rounded-full h-8 w-8 md:h-10 md:w-10'/>
                }    
            </td>
            <td className='px-4 py-1 md:py-2'>{props.record.firstName}</td>
            <td className='px-4 py-1 md:py-2'>{props.record.lastName}</td>
            <td className='px-4 py-1 md:py-2'><a className='hover:text-blue-500' href='mailto:{props.record.email}'>{props.record.email}</a></td>
            <td className='px-4 py-1 md:py-2'>
                <div onClick={onClick} >
                    <button className='mb-2 hover:text-blue-600 visited:text-red-700 border-[1px] border-b-0 border-teal-700 px-2 pt-1 pb-0 shadow-inner'>{btnText}</button> 
                    {show ?
                    <div className='fixed inset-0 overflow-y-auto'>
                       <div className='flex justify-center items-center min-h-screen'>
                            <ul className='relative left-48 shadow-md'>
                                <li className='block'><FaFacebookF className='inline text-blue-800'/>: {props.record.socials.facebook}</li>
                                <li className='block'><FaTwitter className='inline text-blue-800'/>: {props.record.socials.twitter}</li>
                                <li className='block'><FaInstagram className='inline text-red-800'/>: {props.record.socials.instagram}</li>
                                <li className='block'><FaLinkedin className='inline text-blue-800'/>: {props.record.socials.linkedin}</li>
                            </ul> 
                        </div>
                    </div>
                    : false }
                </div>
            </td>
            <td className='px-4 py-1 md:py-2'>{props.record.interest}</td>
            <td className='px-4 py-1 md:py-2'>{props.record.graduationYear}</td>
            <td className='px-4 py-1 md:py-2'>
                <Link to={`/edit/${props.record._id}`} className='underline text-blue-800 hover:text-blue-600 hover:text-lg visited:text-purple-700 active:text-blue-300'>Edit</Link> | 
                <button onClick={() => {props.deleteRecord(props.record._id)}} className='text-red-800 hover:text-red-600 hover:text-lg'>Delete</button>
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
            <h3 className="font-semibold text-2xl lg:text-3xl my-4 text-center">Students Record</h3>

            <SearchRecord records={records} setRecords={setRecords} />
            
            <div className='container mx-auto shadow-sm overflow-x-scroll lg:overflow-none rounded-md w-full'>
                <table className='min-w-full leading-normal'>
                    <thead>
                        <tr className='text-left bg-red-800 text-white tracking-wide w-full'>
                            <th className='px-4 py-1 md:py-2 w-0 uppercase font-medium'>Photo</th>
                            <th className='px-4 py-1 md:py-2 uppercase font-medium'>First Name</th>
                            <th className='px-4 py-1 md:py-2 uppercase font-medium'>Last Name</th>
                            <th className='px-4 py-1 md:py-2 uppercase font-medium'>Email</th>
                            <th className='px-4 py-1 md:py-2 uppercase font-medium'>Socials</th>
                            <th className='px-4 py-1 md:py-2 uppercase font-medium'>Interest</th>
                            <th className='px-4 py-1 md:py-2 uppercase font-medium'>Graduation Year</th>
                            <th className='px-4 py-1 md:py-2 uppercase font-medium'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>{recordList()}</tbody>
                </table> 
            </div>
        </div>
    )
}
