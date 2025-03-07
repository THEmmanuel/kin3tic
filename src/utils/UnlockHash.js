const crypto = require("crypto");
const argon2 = require("argon2");

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Recommended IV size for GCM
const SALT_LENGTH = 16; // Recommended Argon2 salt length

async function generateUnlockHash(passphrase) {
	const salt = crypto.randomBytes(SALT_LENGTH); // Unique salt per user
	const key = await argon2.hash(passphrase, {
		type: argon2.argon2id,
		salt,
		hashLength: 32,
		timeCost: 3,
		memoryCost: 2 ** 16,
		parallelism: 2
	});

	const iv = crypto.randomBytes(IV_LENGTH);
	const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key.slice(-32), 'hex'), iv);

	let encrypted = cipher.update(passphrase, "utf8", "hex");
	encrypted += cipher.final("hex");
	const authTag = cipher.getAuthTag().toString("hex");

	return `${salt.toString("hex")}.${iv.toString("hex")}.${encrypted}.${authTag}`;
}

async function decryptUnlockHash(passphrase, unlockHash) {
	const [saltHex, ivHex, encryptedData, authTagHex] = unlockHash.split(".");
	const salt = Buffer.from(saltHex, "hex");
	const iv = Buffer.from(ivHex, "hex");
	const authTag = Buffer.from(authTagHex, "hex");

	const key = await argon2.hash(passphrase, {
		type: argon2.argon2id,
		salt,
		hashLength: 32,
		timeCost: 3,
		memoryCost: 2 ** 16,
		parallelism: 2
	});

	const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key.slice(-32), 'hex'), iv);
	decipher.setAuthTag(authTag);

	let decrypted = decipher.update(encryptedData, "hex", "utf8");
	decrypted += decipher.final("utf8");

	return decrypted;
}

// Example Usage
(async () => {
	const passphrase = "mySuperSecurePassword!";
	const unlockHash = await generateUnlockHash(passphrase);
	console.log("Unlock Hash:", unlockHash);

	const decryptedPassphrase = await decryptUnlockHash(passphrase, unlockHash);
	console.log("Decrypted Passphrase:", decryptedPassphrase);
})();