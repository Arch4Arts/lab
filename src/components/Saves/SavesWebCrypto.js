// Генерация уникального ключа на основе имени сохранения
async function genEncryptionKey(saveName, mode, length) {
	let algo = {
		name: 'PBKDF2',
		hash: 'SHA-512',
		salt: new TextEncoder().encode('a-unique-salt-for-save'),
		iterations: 1000
	};
	let derived = { name: mode, length: length };
	let encoded = new TextEncoder().encode(saveName);
	let key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
	
	return crypto.subtle.deriveKey(algo, key, derived, false, ['encrypt', 'decrypt']);
};


export default {
	encrypt: async function (saveName, saveData) {
		let algo = {
			name: 'AES-GCM',
			length: 256,
			iv: crypto.getRandomValues(new Uint8Array(12))
		};
		let key = await genEncryptionKey(saveName, algo.name, algo.length);
		let encoded = new TextEncoder().encode(saveData);
		
		return {
			cipherData: await crypto.subtle.encrypt(algo, key, encoded),
			iv: algo.iv
		};
	},
	decrypt: async function (saveName, encryptedData) {
		let algo = {
			name: 'AES-GCM',
			length: 256,
			iv: encryptedData.iv
		};
		let key = await genEncryptionKey(saveName, algo.name, algo.length);
		let decrypted = await crypto.subtle.decrypt(algo, key, encryptedData.cipherData);
	
		return new TextDecoder().decode(decrypted);
	}
};