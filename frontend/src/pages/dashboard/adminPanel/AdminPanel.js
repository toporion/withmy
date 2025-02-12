import React, { useEffect, useState } from 'react';
import useAuth from '../../../hook/useAuth';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const { user } = useAuth();
    console.log('see the user',user)
    const navigate=useNavigate()
    const [loggedInUser,setLoggedInUser]=useState('')

    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedinUser'))
    },[])

    const handleLogOut=(e)=>{
        localStorage.removeItem('token')
        localStorage.removeItem('loggedinUser')
        setTimeout(()=>{
            navigate('/')
        },1000)
    }

    if (!user) {
        return <p>Please log in to access the Admin Panel.</p>;
    }


   
       
    

    return (
        <div className='text-center'>
            <p className='text-2xl font-extrabold'>Admin Panel {user.name}{loggedInUser}</p>
            <button onClick={handleLogOut} >Logout</button>
        </div>
    );
};

export default AdminPanel;
