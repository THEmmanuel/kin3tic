// sessionDB.js

export function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('sessionDB', 1);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			db.createObjectStore('sessions', {
				keyPath: 'id'
			}); // id = 'current'
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject('IndexedDB error');
		};
	});
}

export async function saveSession(tokenObj) {
	const db = await openDB();
	const tx = db.transaction('sessions', 'readwrite');
	const store = tx.objectStore('sessions');
	await store.put({
		id: 'current',
		...tokenObj
	});
	return tx.complete;
}

export async function getSession() {
	const db = await openDB();
	const tx = db.transaction('sessions', 'readonly');
	const store = tx.objectStore('sessions');
	return new Promise((resolve, reject) => {
		const request = store.get('current');
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject('Failed to read session');
	});
}


export async function clearSession() {
	const db = await openDB();
	const tx = db.transaction('sessions', 'readwrite');
	const store = tx.objectStore('sessions');
	await store.delete('current');
	return tx.complete;
}









// // Usage.
// import { saveSession, getSession, clearSession } from './sessionDB.js';

// // Set
// await saveSession({ token: 'abc123', expiresAt: Date.now() + 2 * 60 * 60 * 1000 });

// // Get
// const session = await getSession();
// if (session && Date.now() < session.expiresAt) {
//   console.log('Valid session:', session.token);
// } else {
//   await clearSession();
//   console.log('Session expired');
// }

// // Clear
// await clearSession();