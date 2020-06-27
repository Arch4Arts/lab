// Генерация уникального ключа на основе имени сохранения
async function genEncryptionKey(saveName, mode, length) {
	const algoritm = {
		name: 'PBKDF2',
		hash: 'SHA-512',
		salt: new TextEncoder().encode('3F4428472B4B6250'),
		iterations: 1
	};
	let derived = { name: mode, length: length };
	let encoded = new TextEncoder().encode(saveName);
	let key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
	
	return crypto.subtle.deriveKey(algoritm, key, derived, false, ['encrypt', 'decrypt']);
};


export default {
	algoritm: {
		name: 'AES-GCM',
		length: 256,
		iv: crypto.getRandomValues(new Uint8Array(12))
	},
	encrypt: async function (saveName, saveData) {
		const algo = this.algoritm;

		let key = await genEncryptionKey(saveName, algo.name, algo.length);
		let encoded = new TextEncoder().encode(saveData);
		
		return {
			cipherData: await crypto.subtle.encrypt(algo, key, encoded),
			iv: algo.iv
		};
	},
	decrypt: async function (saveName, encrypted) {
		const algo = this.algoritm;
		algo.iv = encrypted.iv;

		let key = await genEncryptionKey(saveName, algo.name, algo.length);
		let decrypted = await crypto.subtle.decrypt(algo, key, encrypted.cipherData);
	
		return new TextDecoder().decode(decrypted);
	}
};