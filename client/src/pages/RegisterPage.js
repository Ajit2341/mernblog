import React, { useState } from 'react'

export default function RegisterPage(){

    const[userName, setUserName] = useState('')
const[userPassword, setuserPassword] = useState('')
async function register(ev){

    ev.preventDefault();

    const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({userName, userPassword}),
        // for sending json we need headers
        headers: {'Content-Type': 'application/json'}
    })

    if(response.status !== 200){
        alert('registration failed')
    } else {
        alert('registration successful')
    }
    

}

        return (
                <form className='register' onSubmit={register}>
                <h1 className='login-register-title'>Register</h1>
                    <input type='text' 
                    placeholder='username'
                    value={userName}
                    onChange={anything => setUserName(anything.target.value)} />
                    <input type='password' 
                    placeholder='password'
                    value={userPassword}
                    onChange={anything => setuserPassword(anything.target.value)} />
                    <button>Register</button>
                </form>
        )



    
}
