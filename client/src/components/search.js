import React, { useState } from 'react'
import {FaSearch } from 'react-icons/fa'

export default function SearchRecord({records, setRecords}) {
    const [query, setQuery] = useState()

    let search = (data) => {
        return data.filter(student => {
            return student.firstName.toLowerCase().includes(query)
        })
    }

    const onClick = (e)  => {
        return search = () => {
            return setRecords(search(records))
        }
    }

    return (
        <div className='my-6 mb-5 md:my-7 md:mb-6 justify-center rounded-md md:gap-y-3 flex'>
            <input type='search' onChange={e => setQuery(e.target.value.toLowerCase())} className='border-[1px] rounded-l-full border-red-700 w-96 px-3 py-1 md:py-2 hover:bg-teal-100'
                placeholder='Search...' />
            <button onClick={onClick} 
                className=' bg-red-800 hover:bg-red-700 rounded-r-full px-3 md:px-5 py-1 text-white text-center md:py-2'>
                    <FaSearch  />
            </button>
        </div>
        
    )
} 