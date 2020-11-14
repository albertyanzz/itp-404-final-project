import React, { useEffect, useContext } from "react";
import './App.css';
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { DataStoreContext } from "./contexts";


export default function Home(){
	const { isLoggedIn, setIsLoggedIn, setCurrUser, userName, setUserName } = useContext(DataStoreContext);

	const responseGoogle = (response) => {
		console.log(response);
	}
	

	useEffect(() => {
		document.title = "Home | Microplanner"

		function handleLogout() {
			setIsLoggedIn(false);
			setCurrUser(null);
		}

		async function onSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();
			console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
			console.log('Name: ' + profile.getName());
			console.log('Image URL: ' + profile.getImageUrl());
			console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
			// var id_token = googleUser.getAuthResponse().id_token

			setIsLoggedIn(true);
			setCurrUser(profile.getEmail());
			setUserName(profile.getGivenName());

			//find user id here
		}


		ReactDOM.render(
			(isLoggedIn ? 
				<GoogleLogout
					clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
					buttonText="Logout"
					onLogoutSuccess={handleLogout}
			  	>
			  	</GoogleLogout>
				:
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID}
					buttonText={isLoggedIn ? "Logged in!" : "Login"}
					onSuccess={onSignIn}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
					isSignedIn={true}
				/>
			),
			document.getElementById('googleButton')
		  );
	}, [setIsLoggedIn, isLoggedIn, setCurrUser, setUserName]);

	return(
		<div className="homeContainer">
			<div className="row homeFont homeItem">
				Microplanner
			</div>
			<div className="row homeItem">
				{ !isLoggedIn &&
					<Link to="/tasks" className="btn btn-light">
						Use as Guest
					</Link>
				}
			</div>
			<div id="googleButton">
			</div>
			<div className="welcomeText">
				{isLoggedIn && `Welcome, ${userName}!`}
			</div>
		</div>
	)
}