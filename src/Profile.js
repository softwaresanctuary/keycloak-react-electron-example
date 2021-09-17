import React from "react";
import { Link } from "react-router-dom";
import Keycloak from "keycloak-js";
import * as jwt from "jsonwebtoken";
 
export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keycloak: null,
			authenticated: false
		};
	}

	componentDidMount() {
		let keycloak = Keycloak('/keycloak.json');
		keycloak.init({onLoad: 'login-required'})
			.then(authenticated => {
		  		this.setState({ 
					keycloak: keycloak,
					token: keycloak.token,
					authenticated: authenticated 
				});
			})
	}

	render() {
		const {
			keycloak,
			authenticated
		} = this.state;
		let decodedToken = "";
		// if (keycloak.token != null) {
		// 	let decodedToken = jwt.decode(keycloak.token, {
		// 		complete: true
		// 	});
		// }
		if (keycloak) {
			if (authenticated) {
				return (
					<div>
						<h1>Token</h1>
						<pre>
							{keycloak.token}
						</pre>
						<pre>
							{
								decodedToken
							}
						</pre>
						<Link to="/">Go back to home</Link> <br/>
						<Link to="/companies">Companies</Link>
					</div>
				)
			} else {
				return (
					<div>
						<h1>Unable to authenticate!</h1>
					</div>
				)
			}
		}
		return (
			<div>
				<h1>Redirecting to authentication...</h1>
			</div>
		);
	}
}