import React, { useContext, useState } from 'react'
import { Navigate } from "react-router-dom";
import { userContext } from '../Context/UserContext';

export default function LoginPage() {

    const [userName, setUserName] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setuserInfo} = useContext(userContext)

    //using arrow function fetch api for login user
    // passing username and userpassword into the body

    const login = async (event) => {

        event.preventDefault();

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ userName, userPassword }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        if (response.ok) {
            response.json().then(userInfo => {
                setuserInfo(userInfo);
                setRedirect(true);
            })

        } else {
            alert('wrong credentials')
        }

    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type='text' placeholder='username'
                value={userName}
                onChange={event => setUserName(event.target.value)}
            ></input>
            <input type='password' placeholder='password'
                value={userPassword}
                onChange={event => setuserPassword(event.target.value)}
            ></input>
            <button>Login</button>
        </form>
    )

}

