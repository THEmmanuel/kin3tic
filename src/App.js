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
import EncodeKey from './pages/EncodeKey/EncodeKey';
import CreateUnlockHash from './pages/CreateUnlockHash/CreateUnlockHash';
import CategoryHome from './pages/CategoryHome/CategoryHome';
import KineticKeyScanner from './pages/KineticKeyScanner/KineticKeyScanner';
import UnlockHashScanner from './pages/UnlockHashScanner/UnlockHashScanner';
import KineticKeysWhitepaper from './pages/KineticKeysWhitepaper/KineticKeysWhitepaper';


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
						element={<EncodeKey />}
					/>

					<Route
						exact
						path='/category-home'
						element={<CategoryHome />}
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

					<Route
						exact
						path='/unlock-hash-scanner'
						element={<UnlockHashScanner />}
					/>

					<Route
						exact
						path='/kinetic-key-scanner'
						element={<KineticKeyScanner />}
					/>

					<Route
						exact
						path='/kinetic-keys-whitepaper'
						element={<KineticKeysWhitepaper />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;