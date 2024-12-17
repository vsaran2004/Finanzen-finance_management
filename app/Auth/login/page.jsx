"use client"

import React, { useState } from 'react'
import Link from 'next/link'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        e.preventDefault()
        console.log('Login with', email, password)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-700 to-teal-500 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                        Login to Your Account
                    </h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 space-y-4">
                    <p className="text-xs text-gray-600 text-center">
                        <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                            Forgot your password?
                        </Link>
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                            Create New Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login

