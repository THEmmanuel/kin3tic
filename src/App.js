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
	const [mainHash, setMainHash] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const initSession = async () => {
			const session = await getSession();

			if (session && session.mainhash && Date.now() < session.expiresAt) {
				console.log('Valid session found:', session);
				setMainHash(session.mainhash);
				fetchUser(session.mainhash);
			} else {
				console.log('No valid session');
			}
		};

		const fetchUser = async (mainhash) => {
			try {
				const res = await axios.post(`${API_URL}/users/by`, {
					MainHash: mainhash
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