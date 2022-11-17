import React, { useLayoutEffect, useState } from "react";
import RecordList from '../components/recordList'
import Analytics from './analytics'


const Dashboard = () => {
    const [username, setUsername] = useState(null)

    useLayoutEffect(() => {
        fetch('http://localhost:7000/isuserauth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username) : null)
        .catch(err => alert(err))
    }, [])


    return ( <
        div>
            {username 
                ? <h2 className='text-xl md:text-2xl m-5'>Welcome, <span className='font-semibold'>{username}</span></h2>
                : null
            }

            <Analytics />
            <RecordList />
        </div>
    )
}


export default Dashboard