import React from "react";
import './App.css';
import { Link } from "react-router-dom";

export default function Home(){

	return(
		<div className="homeContainer">
			<div className="row homeFont homeItem">
				Microplanner
			</div>
			<div className="row homeItem">
				<Link to="/tasks" className="btn btn-light">
					Use as Guest
				</Link>
			</div>
		</div>
	)
}