import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error_msg, setMessage] = useState('')
    const [showSubmitError, setShowSubmitError] = useState(false)

    const navigate = useNavigate()

    // UPDATED: This function now accepts the token from the API response
    function onSubmitSuccess(jwtToken) {
        // Store the token in localStorage to "remember" the user's session
        localStorage.setItem('jwt_token', jwtToken);
        navigate('/home', { replace: true })
    }

    function onSubmitFailure(msg) {
        setShowSubmitError(true)
        setMessage(msg)
    }

    const subbmitForm = async (e) => {
        e.preventDefault()
        const userDetails = { username, password }
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()
            console.log("Full Response Object:", response)
            console.log("Parsed Data:", data)

            if (response.ok === true) {
                // UPDATED: Pass the token from the data to the success function
                onSubmitSuccess(data.jwt_token) 
            } else {
                onSubmitFailure(data.error_msg || "Login failed. Please check your credentials.")
            }
        } catch (error) {
            console.error("Fetch error in try...catch block:", error)
            onSubmitFailure("Network error or server connection issue. Please try again.")
        }
    }

    function onChangeUsername(e) {
        setUsername(e.target.value)
        setShowSubmitError(false) 
    }

    function onChangePassword(e) {
        setPassword(e.target.value)
        setShowSubmitError(false) 
    }

    return (
        <div
            className='min-h-screen bg-cover bg-center flex items-center justify-center'
            style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://res.cloudinary.com/dsyfrwb0s/image/upload/v1751820646/spotify-profile_myqtkm.png')",
            }}
        >
            <div className='bg-black bg-opacity-80 rounded-lg p-10 w-full max-w-sm text-white shadow-xl flex flex-col items-center'>
                <form onSubmit={subbmitForm} className='w-full'>
                    <div className='flex flex-col items-center mb-8'>
                        <img
                            src='https://res.cloudinary.com/dsyfrwb0s/image/upload/v1751821365/profile1_p9o5pc.png'
                            alt='Spotify Logo'
                            className='h-16 mb-4'
                        />
                        <h1 className='font-bold text-white text-3xl tracking-wide font-montserrat'>
                            Spotify Remix
                        </h1>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide' htmlFor='username'>
                            Username
                        </label>
                        <input
                            type='text'
                            id='username'
                            className='bg-gray-800 border border-gray-700 text-white text-base rounded p-3 w-full focus:outline-none focus:border-green-500'
                            onChange={onChangeUsername}
                            value={username}
                            placeholder='Enter your username'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide' htmlFor='password'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='bg-gray-800 border border-gray-700 text-white text-base rounded p-3 w-full focus:outline-none focus:border-green-500'
                            onChange={onChangePassword}
                            value={password}
                            placeholder='Enter your password'
                        />
                    </div>

                    <button
                        type='submit'
                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full w-full transition duration-300 ease-in-out'
                    >
                        Log In
                    </button>

                    {showSubmitError && (
                        <p className='text-red-400 text-sm mt-4 text-center'>{error_msg}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
