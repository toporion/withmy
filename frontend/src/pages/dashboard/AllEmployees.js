import React, { useEffect, useState } from 'react';
import axios from 'axios'
import EmployeeTable from '../../components/EmployeeTable';
import AddEmployeeModal from '../../components/AddEmployeeModal';

const AllEmployees = () => {
    const [employeeData,setEmployeeData]=useState({
        employees: [],
     pagination: {
            "totalEmployees": 0,
            "totalPages": 1,
            "currentPage": 1,
            "pageSize": 5
        }
    })
    const [isModalOpen,setIsModalOpen]=useState(false)
    const fetchAllEmployees=async(page=1,limit=5,search='')=>{
        try{
            const res=await axios.get('http://localhost:8080/api/login',{
                params:{page,limit,search}
            })
            console.log('see the log',res.data)
            setEmployeeData({
                employees: res.data.data.employees || [],
                pagination: res.data.data.pagination || {},
            });
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchAllEmployees()
    },[])
    return (
        <div>
            <p className='text-4xl font-bold'><button 
            onClick={()=>setIsModalOpen(true)}
            className='btn btn-success'>Add Employee</button></p>
            <EmployeeTable
            fetchEmployees={fetchAllEmployees}
            employees={employeeData.employees}
            pagination={employeeData.pagination}
            />
            {
                isModalOpen && (
                    <AddEmployeeModal
                    onClose={()=>setIsModalOpen(false)}
                    />
                )
            }
        </div>
    );
};

export default AllEmployees;