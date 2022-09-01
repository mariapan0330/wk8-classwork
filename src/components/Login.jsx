import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(e);

        let username = e.target.username.value
        let password = e.target.password.value

        let myHeaders = new Headers()
        myHeaders.append('Authorization', "Basic " + btoa(`${username}:${password}`))

        let response = await fetch('http://localhost:5000/api/token', {headers:myHeaders})
        if (response.ok){
            console.log('ok');

            let data = await response.json()
            console.log(data);

            localStorage.setItem('token', data.token)
            localStorage.setItem('expiration', data.token_expiration)

            
            // change login state to true
            props.login()
            props.setLoggedUser(username)

            // flash success message and navigate back to home
            props.flashMessage('You have successfully logged in!!!','success')
            navigate('/')
        } else {
            props.flashMessage("That didn't work! Your username and/or password is incorrect!", 'danger')
        }
    }
    
    return (
        <>
            <h4 className="text-center">Login</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{margin: "0 20vw"}} id='inlineTest'>
                    <label htmlFor="username">Username</label>
                    <input type="text" className='form-control mb-3' placeholder="Enter Username" name='username'/>
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control mb-3' placeholder="Enter Password" name='password'/>

                    <input type="submit" className='btn btn-primary w-100' value='Register'/>
                </div>
            </form>
        </>
    )
}
