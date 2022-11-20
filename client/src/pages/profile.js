import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'


const Profile = () => {
    const params = useParams()
    const [user, setUser] = useState({})

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString() 

            //get the response
            const response = await fetch(`http://localhost:7000/u/${id}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            })
            if(!response.ok) return window.alert(`An error has occurred: ${response.statusText}`)

            const data = await response.json()
            if(!data) {
                window.alert(`An error has occurred: ${response.statusText}`)
            }

            setUser(data)

        }
        fetchData()
        return
    }, [params.id]) 

    return (
        <>
            <div>
                <h3>Welcome</h3>
            </div>
        </>
    )
}


export default Profile