import React from 'react'
import './Styles/NavBar.css'
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        props.updateLogin(false)
        navigate('/')
    }
    
    const handleEmployeeData = async () => {
      
        try {
            let response = await fetch('http://localhost:4000/getemployee')
            let dataobj= await response.json()
            // console.log(dataobj)
            // GetEmployee(dataobj)
            navigate("/GetEmployee",{state:{employee:dataobj}})
        }
        


        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='navbar'>
            <nav>
               { props.isLogin ? 
            <>
                <button>Home</button>
                <button onClick={() => navigate('/CreateEmployee')}>Create Employee</button>
                <button onClick={handleEmployeeData}>Employee List</button>
                <button onClick = {handleLogout}>Logout</button>
                </> :
                <button onClick={handleLogout}>Welcome Please Login</button>
                }

            </nav>
        </div>
    )
}

export default NavBar
