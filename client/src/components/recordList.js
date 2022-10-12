//To serve as a viewing component for our records - it will fetch all the records in our database through a GET method


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 


//Record component
const Record = (props) => (
    <tr>
        <td>    
            <img src={`http://localhost:7000/uploads/${props.record.photo}`} alt='user' width='10%'/>
        </td>
        <td>{props.record.firstName}</td>
        <td>{props.record.lastName}</td>
        <td>{props.record.email}</td>
        <td>{props.record.socials.facebook}
            {props.record.socials.twitter}
            {props.record.socials.instagram}
            {props.record.socials.linkedin}
        </td>
        <td>{props.record.interest}</td>
        <td>{props.record.graduationYear}</td>
        <td>
            <Link to={`/edit/${props.record._id}`}>Edit</Link> |
            <button onClick={() => {props.deleteRecord(props.record._id)}}>Delete</button>
        </td>
    </tr>
)


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
            <h3>Record List</h3>

            <table>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Socials</th>
                        <th>Interest</th>
                        <th>Graduation Year</th>
                    </tr>
                </thead>

                <tbody>{recordList()}</tbody>
            </table> 
        </div>
    )
}
