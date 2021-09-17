import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";

import './index.css';
import App from './App';
import Profile from './Profile';
import Companies from './Companies';
 
// import * as serviceWorker from './serviceWorker';
 
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<div className="App">
				<Route path="/" exact component={App} />
				<Route path="/Profile" exact component={Profile} />
				<Route path="/Companies" exact component={Companies} />
			</div>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
