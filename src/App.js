import Navbar from "./components/Navbar.js"
// import Racers from './components/Racers.jsx';
import ButtonCounter from './components/ButtonCounter.jsx';
import RacersClass from './components/RacersClass.jsx';
import { Routes, Route } from 'react-router-dom'
import Register from "./components/Register.jsx";
import AlertMessage from "./components/AlertMessage.jsx";
import { useState } from 'react'
import Login from "./components/Login.jsx";
import CreatePost from "./components/CreatePost.jsx";

function App(props) {
	const now = new Date();
	const [message, setMessage] = useState(null) // initial state of the message is null; later, if message is not null you display the message
	const [category, setCategory] = useState(null)
	const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration') > now ? true : false)))
	console.log('reloading')
	const [loggedUser, setLoggedUser] = useState(null)

	const flashMessage = (message, category) => {
		setMessage(message)
		setCategory(category)
	}

	const logIn = () => {setLoggedIn(true)}
	const logOut = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('expiration')
		setLoggedIn(false)
	}


	return (
		<>
			<Navbar username={loggedUser} logout={logOut} loggedIn={loggedIn} />
			<div className="container">
				{message ? <AlertMessage message={message} category={category} flashMessage={flashMessage}/> : null}
				{loggedIn ? <p className='text-center'>You're logged in as {loggedUser}</p> : <h1 className='text-center'>Log in or sign up!</h1> }
				<Routes> {/* !!! These routes are not visible to the user. The visible links are in Navbar.js !!! */}
					<Route path='/' element={<ButtonCounter />}/>
					<Route path='/create-post' element={<CreatePost flashMessage={flashMessage} />} />
					<Route path='/login' element={<Login flashMessage={flashMessage} login={logIn} setLoggedUser={(username) => {setLoggedUser(username)}}/>}/>
					<Route path='/register' element={<Register flashMessage={flashMessage} />} />
					<Route path='/standings' element={<RacersClass />} />
				</Routes>
			</div>
		</>

	)
}

export default App;