import React, { useState } from 'react'


export default function SearchRecord({records, setRecords}) {
    const [query, setQuery] = useState()

    const search = (data) => {
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
        <div className='my-6 mb-5 md:my-7 md:mb-6 text-center sticky top-0'>
            <input type='search' onChange={e => setQuery(e.target.value.toLowerCase())} className='border-[1px] border-blue-600 w-80 px-2 py-1 hover:bg-blue-100'
                placeholder='type something....' />
            <input type='submit' value='Search' onClick={onClick} 
                className='font-semibold bg-blue-700 hover:bg-blue-600 px-6 md:px-8 py-[5px] text-white text-center' />
        </div>
        
    )
} 