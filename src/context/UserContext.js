// context/UserContext.js
import {
	createContext
} from 'react';

export const UserContext = createContext({
	mainHash: null,
	user: null,
	setUser: () => {},
});