import React from 'react';
import { useLocation } from 'react-router-dom';

const GetEmployee = () => {
    const location = useLocation();
    const { employee } = location.state || {};
    console.log(employee,"employee")

    // Check if employee is an array, otherwise handle the case where it's not
    const employeeList = Array.isArray(employee) ? employee : [];

    return (
        <div>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
    {employeeList.length > 0 ? (
        employeeList.map((employeedata, index) => (
            <tr key={index}>
                {employeedata.f_Name && <td>{employeedata.f_Name}</td>}
                {employeedata.f_Email && <td>{employeedata.f_Email}</td>}
                {employeedata.f_Mobile && <td>{employeedata.f_Mobile}</td>}
                {employeedata.f_Designation && <td>{employeedata.f_Designation}</td>}
                {employeedata.f_Gender && <td>{employeedata.f_Gender}</td>}
                {employeedata.f_Course && <td>{employeedata.f_Course}</td>}
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6">No employee data available</td>
        </tr>
    )}
</tbody>


            </table>
        </div>
    );
}

export default GetEmployee;
