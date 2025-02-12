import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div className="h-screen flex flex-col">
            {/* Header Section */}
            <div className="bg-green-600 p-4">
                <p className="text-white font-bold">Logout</p>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <div className="bg-blue-400 text-xl w-72 h-full font-bold text-white flex ">
                    <Link to="/dashboard/totalEmployees"><p>Total Employees</p></Link>
                </div>

                {/* Main Content */}
                <div className="bg-slate-600 w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
