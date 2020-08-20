import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AngularSize } from './components/AngularSize';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<AngularSize />

			</header>
		</div>
	);
}

export default App;
