import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css'

const Login = (props) => {

    const [data, setData] = useState({
        username: '',
        userpassword: '',
        serverMessage:''
    })

    const [message,setMessage]=useState(null)
    const navigate = useNavigate();

    const handleChange = (event) => {
        //  setData(details.target.value )
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }))

    }
    const handleSubmit =async () => {
        // event.preventDefault(event);
        // console.log("the name is", data.name)
        // console.log("the password is", data.password)
        try{
            const response=await fetch("http://localhost:4000/loginuser",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(data)
            })
          const dataobj=await response.json()
          console.log(dataobj.message)
          setMessage(dataobj.message)
          if(dataobj.message==="Login successful!"){
            props.updateLogin(true)
            navigate("/CreateEmployee")
          }
        
        }
        catch(error){
            console.log(error)
        }
      

        

    }

    return (
        <div className='container'>
            {/* <form onSubmit={handleSubmit}> */}
            <label>Name</label>
            <input type='text' name='username' value={data.username} placeholder='enter your name' onChange={handleChange}></input>
            <label>Password</label>
            <input type='password' name='userpassword' value={data.userpassword} placeholder='enter your password' onChange={handleChange} ></input>
            <button type='button' onClick={handleSubmit}>Login</button>
            <p>{message}</p>
            {/* </form> */}

            
        </div>
    )
}

export default Login
