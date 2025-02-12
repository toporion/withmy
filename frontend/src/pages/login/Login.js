import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from "../../hook/useAuth";

const Login = () => {
    const {login}=useAuth()
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            // const token = localStorage.getItem('token'); // Retrieve token from localStorage
            
            const res = await axios.post(
                'http://localhost:8080/api/login',data)
            console.log(res.data);
            const { user, name, jwtToken } = res.data;
            console.log(name, "nm please");
            if (res.data.success) {
                login(res.data.user);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedinUser', user.name);
                console.log('see name', user.name);
                if (res.data.user.role === "admin") {
                    navigate('/dashboard/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong during login.");
        }
    };
    

    return (
        <div
            className="flex items-start justify-center h-screen py-10"
            style={{
                background: "linear-gradient(to top,white 50%, lightblue 50% )",
            }}
        >

            <div className="max-w-[400px] w-full ">
                <p className="text-center text-3xl font-bold sevillana-regular">Employee Management System</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-lg p-10 rounded-md  mt-10"
                >


                    <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Password is required" })}
                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
                    >
                        Login
                    </button>

                    {/* Signup Link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
