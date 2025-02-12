import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const UpdateEmployee = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        console.log('Form Data:', data);
    
        // Prepare FormData
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);
    
        // Attach the file
        if (data.profileImage[0]) {
            formData.append('profileImage', data.profileImage[0]);
        }
    
        try {
            const res = await axios.put('http://localhost:8080/api/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    
        reset();
        onClose();
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add Employee</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email format',
                                },
                            })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Role Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            {...register('role', { required: 'Role is required' })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                            <option value="staff">Staff</option>
                            <option value="super-admin">Super Admin</option>
                        </select>
                        {errors.role && (
                            <span className="text-red-500 text-sm">{errors.role.message}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Profile Image Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            {...register('profileImage')}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 text-gray-500"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEmployee;
