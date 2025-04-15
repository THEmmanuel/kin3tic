// utils/SessionGuard.js
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getSession } from './sessionDB';

const API_URL = process.env.REACT_APP_BACKEND_API;

// Define public routes that don’t require a session
const PUBLIC_ROUTES = [
	'/NullWallet/Start',
	'/NullWallet/Import',
	'/NullWallet/Create',
];

const SessionGuard = ({ children, setUser, setMainHash }) => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const checkSession = async () => {
			try {
				const session = await getSession();

				// Allow public routes without session
				if (PUBLIC_ROUTES.includes(location.pathname)) {
					setLoading(false);
					return;
				}

				if (session && session.mainhash && Date.now() < session.expiresAt) {
					setMainHash(session.mainhash);
					const res = await axios.post(`${API_URL}/users/by`, {
						MainHash: session.mainhash,
					});
					setUser(res.data);
				} else {
					console.log('No valid session, redirecting');
					navigate('/NullWallet/Start');
				}
			} catch (err) {
				console.error('Session check failed:', err);
				navigate('/NullWallet/Start');
			} finally {
				setLoading(false);
			}
		};

		checkSession();
	}, [location.pathname, navigate, setMainHash, setUser]);

	if (loading) {
		return <div>Loading...</div>; // or a spinner
	}

	return children;
};

export default SessionGuard;
