import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";

function Table(){
    const [data,setData] = useState([])
    
    const {people} = data
 
    const navigate = useNavigate()
    useEffect(() =>{
        axios.get('http://localhost:8081/api/v1/people')
        .then(res => {
            console.log(res)
            setData(res.data)})
        .catch(err => console.log(err))        
    },[])
    return(
        <div className="container mt-5">
            <div>
                <Link to="/" className="btn btn-primary">
                    Form Page
                </Link>
            </div>
            <table className="table">  
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Confirm Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                     {data.people.map((d,i)=>(                        
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.firstName}</td>
                            <td>{d.lastName}</td>
                            <td>{d.email}</td>
                            <td>{d.password}</td>
                            <td>{d.confirmPassword}</td>
                            <td>
                                <Link className="text-decoration-none btn btn-success" to={`/update/${d.id}`}>
                                    Update
                                </Link>
                                <button className="btn btn-danger ml-3" onClick={e => handleDelete(d.id)}>Delete</button>
                            </td>
                        </tr>
                     ))}
                </tbody>
            </table>
        </div>
    )

    function handleDelete(id){
        const confirm = window.confirm("Are you sure?, Data will be deleted permanantly")
        if(confirm){
            axios.delete('http://localhost:8081/api/v1/people/:id' + id)
            .then(res =>{
                alert("Record Deleted")
                navigate('/table')
        })
        }
        
    }
}

export default Table;