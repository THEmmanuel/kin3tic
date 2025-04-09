import logo from './logo.svg';
import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	// Link,
	// useLocation
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Home from './Home'
import KineticKeyHome from './pages/KineticKeys/KineticKeyHome'
import DecodeKey from './pages/DecodeKey/DecodeKey';
import EncodeKey from './pages/EncodeKey/EncodeKey';
import CreateUnlockHash from './pages/CreateUnlockHash/CreateUnlockHash';
import CategoryHome from './pages/CategoryHome/CategoryHome';
import KineticKeyScanner from './pages/KineticKeyScanner/KineticKeyScanner';
import UnlockHashScanner from './pages/UnlockHashScanner/UnlockHashScanner';
import KineticKeysWhitepaper from './pages/KineticKeysWhitepaper/KineticKeysWhitepaper';
import SendAsset from './NullWallet/SendAsset/SendAsset';

import CreateNewWallet from './NullWallet/CreateNewWallet/CreateNewWallet';
import NullStartPage from './NullWallet/StartPage/StartPage';
import NullWalletHome from './NullWallet/NullWalletHome/NullWalletHome';
import NullAsset from './NullWallet/NullAsset/NullAsset';
import ImportWallet from './NullWallet/ImportWallet/ImportWallet';
import { UserContext } from './context/UserContext';
import BuyAsset from './NullWallet/BuyAsset/BuyAsset';

import { saveSession, getSession, clearSession } from '../src/utils/sessionDB';



function App() {
	const API_URL = process.env.REACT_APP_BACKEND_API;
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const mainHash = '';

	useEffect(() => {
		const initSession = async () => {
			const session = await getSession();

			// Check if the session exists and is valid
			if (!session || Date.now() > session.expiresAt) {
				console.log('Session expired or missing. Creating a new one...');

				// Save a new session if it's missing or expired
				await saveSession({
					mainhash: '826e48796d3710dbe92153441f6575ea.EnlvJIdcFTQY1YS',
					expiresAt: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
				});

				// Re-fetch the session after saving
				const newSession = await getSession();
				if (newSession) {
					console.log('New session:', newSession);
					fetchUser(newSession);
				}
			} else {
				console.log('Valid session:', session);
				fetchUser(session);
			}
		};

		const fetchUser = async (session) => {
			try {
				const res = await axios.post(`${API_URL}/users/by`, {
					MainHash: session.mainhash
				});
				setUser(res.data);
			} catch (err) {
				setError(err.response?.data?.message || 'Request failed');
				console.error(err);
			}
		};

		initSession();
	}, [API_URL]);

	return (
		<Router>
			<UserContext.Provider value={{ mainHash, user, setUser }}>
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
							path='/categories'
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

						<Route
							exact
							path='/NullWallet/Start'
							element={<NullStartPage />}
						/>

						<Route
							exact
							path='/NullWallet/Create'
							element={<CreateNewWallet />}
						/>

						<Route
							exact
							path='/NullWallet/Asset/:id/:assetSymbol'
							element={<NullAsset />}
						/>

						<Route
							exact
							path='/NullWallet/SendAsset/:id/:assetSymbol'
							element={<SendAsset />}
						/>

						<Route
							exact
							path='/NullWallet/BuyAsset/:id/:assetSymbol'
							element={<BuyAsset />}
						/>

						<Route
							exact
							path='/NullWallet/Import'
							element={<ImportWallet />}
						/>

						<Route
							exact
							path='/NullWallet/Home'
							element={<NullWalletHome />}
						/>
					</Routes>
				</div>
			</UserContext.Provider>
		</Router>
	);
}

export default App;