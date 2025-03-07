import logo from './logo.svg';
import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Link,
	// useLocation
} from 'react-router-dom';


import Home from './Home'
import KineticKeyHome from './pages/KineticKeys/KineticKeyHome'
import DecodeKey from './pages/DecodeKey/DecodeKey';
import CreateUnlockHash from './pages/CreateUnlockHash/CreateUnlockHash';


function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route
						exact
						path='/'
						element={<Home />}
					/>

					<Route
						exact
						path='/home'
						element={<Home />}
					/>

					<Route
						exact
						path='/encode-kinetic-key'
						element={<KineticKeyHome />}
					/>

					<Route
						exact
						path='/decode-kinetic-key'
						element={<DecodeKey />}
					/>

					<Route
						exact
						path='/create-unlock-hash'
						element={<CreateUnlockHash />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;