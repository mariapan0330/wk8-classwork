import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(props) {

    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        // console.log('Register')

        // Check that the passwords match
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPassword.value;
        if (password !== confirmPass){
            props.flashMessage('Your passwords do not match', 'danger')
        } else {
            console.log("Passwords DO match.");

            // set up request to Flask App (this is mostly from Postman!!)
            let myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json');
            
            let formData = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password // *(we already found this above)
            })

            fetch('http://localhost:5000/api/users', { // that's us! Gotta make the request with specific headers and body
                method: 'POST',
                headers: myHeaders,
                body: formData,
                // redirect: 'follow' // not totally necessary
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error){ // if there's an error, we have it set up so that the data is {error: 'some error message'} in the flask project. So, here it is just checking if the data has an error
                        console.error(data.error) // return the error
                    } else {
                        console.log(data); // this is your data
                        props.flashMessage("You successfully registered.","success")
                        navigate('/')
                    }
                })

        }
    }

    return (
        <>
            {/* {props.setHomeActive('')}
            {props.setStandingsActive('')}
            {props.setRegisterActive('active')} */}
            <h4 className="text-center">Register</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{margin: "0 20vw"}} id='inlineTest'>
                    <label htmlFor="email">Email</label>
                    <input type="text" className='form-control mb-3' placeholder="Enter Email" name='email'/>
                    <label htmlFor="username">Username</label>
                    <input type="text" className='form-control mb-3' placeholder="Enter Username" name='username'/>
                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control mb-3' placeholder="Enter Password" name='password'/>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className='form-control mb-3' placeholder="Enter Password Again" name='confirmPassword'/>

                    <input type="submit" className='btn btn-primary w-100' value='Register'/>
                </div>
            </form>
        </>
    )
}
