import React, { useState } from 'react';
import UpdateEmployee from './UpdateEmployee';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ employees, pagination, fetchEmployees }) => {
    const headers = ['name', 'email', 'role', 'action'];
    const { currentPage, totalPages } = pagination;
    const TableRow = ({ employee }) => {
        return (
            <tr>
                <td className="py-2 px-2 border text-xs">{employee.name}</td>
                <td className="py-2 px-2 border text-xs">{employee.email}</td>
                <td className="py-2 px-2 border text-xs">{employee.role}</td>
                <td className="py-2 px-2 border text-xs">
                    <Link to={`/dashboard/updateEmployee/${employee._id}`}>  <button
                        // onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 px-4 text-white py-1 cursor-pointer">Edit</button></Link>
                    <button className="bg-yellow-600 ml-4 px-4 text-white py-1 cursor-pointer">Delete</button>
                </td>
            </tr>
        );
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1)
        }
    }
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

    const handlePagination = (page) => {
        fetchEmployees(page, 5, '')
    }
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div>
            <div className="w-full p-2">
                <table
                    className="w-full table-auto border-collapse bg-white shadow-md rounded-lg text-center"
                    style={{ tableLayout: 'fixed' }} // Ensure equal column widths
                >
                    <thead>
                        <tr className="bg-blue-600 text-white text-xs sm:text-sm">
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="py-2 px-2 sm:px-4 border"
                                    style={{ width: `${100 / headers.length}%` }} // Set equal width for each column
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, id) => (
                            <TableRow key={emp._id} employee={emp} />
                        ))}
                    </tbody>
                </table>
                {/* Pagination start */}
                <div className="flex items-center justify-between mt-4 text-xs sm:text-sm">
                    <span className="text-blue-400">Page {currentPage} of {totalPages}</span>
                    <div className="flex space-x-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:bg-gray-300"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {
                            pageNumbers.map((page, index) =>
                                <button
                                    key={index}
                                    onClick={() => handlePagination(page)}
                                    className={`px-2 py-1 rounded ${currentPage === page ? 'bg-blue-500' : 'bg-slate-400'}`}
                                >
                                    {page}

                                </button>)
                        }
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded disabled:bg-gray-300"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {
                isModalOpen && (
                    <UpdateEmployee
                        onClose={() => setIsModalOpen(false)}
                    />
                )
            }
        </div>
    );
};

export default EmployeeTable;
