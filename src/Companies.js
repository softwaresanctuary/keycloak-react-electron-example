import React from "react";
import { Link } from "react-router-dom";
import Keycloak from "keycloak-js";
import jwt from "jsonwebtoken";
 
export default class Companies extends React.Component {
	constructor(props) {
		super(props);
		let keycloak = null;
		if (localStorage.getItem("keycloak")) {
			//keycloak = localStorage.getItem("keycloak");
		}
		this.state = {
			authInProgress: true
		};
	}

	componentDidMount() {
		let keycloak = Keycloak('/keycloak.json');
		if (localStorage.getItem("keycloak")) {
			if (localStorage.getItem("keycloak").isAuthenticated) {
				this.setState({
					authInProgress: false
				})
			} else {
				this.login(keycloak);
			}
		} else {
			this.login(keycloak);
		}
	}

	login(keycloak) {
		keycloak.init({onLoad: 'login-required'})
			.then(authenticated => {
				localStorage.setItem("token", keycloak.token);
				localStorage.setItem("keycloak", keycloak);
				localStorage.setItem("authenticated", authenticated);
				this.setState({
					authInProgress: false
				})
			});
	}

	checkAccess(role) {
		if (localStorage.getItem("token") !== null) {
			let token = localStorage.getItem("token");
			let userInfo = jwt.decode(token);
			let realmAccess = userInfo["realm_access"];
			for (let userRoleIndex in realmAccess["roles"]) {
				console.info("user role", realmAccess["roles"][userRoleIndex]);
				if (role === realmAccess["roles"][userRoleIndex]) {
					return true;
				}
			}
		}
		return false;
	}

	render() {
		const {
			authInProgress
		} = this.state;
		let isAuthenticated = localStorage.getItem("authenticated");
		let hasAccess = this.checkAccess("CAN_ACCESS_COMPANIES");
		if (!authInProgress) {
			if (isAuthenticated) {
				if (hasAccess) {
					return (
						<div>
							<h1>Companies</h1>
							<Link to="/">Go back to home</Link>
						</div>
					)
				} else {
					return (
						<div>
							<h1>You are not authorized to see this module!</h1>
							<Link to="/">Go back to home</Link>
						</div>
					)
				}
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