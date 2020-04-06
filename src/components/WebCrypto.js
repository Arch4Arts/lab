import localforage from 'localforage'

// Генерация уникального ключа на основе имени сохранения
async function genEncryptionKey(saveName, mode, length) {
	var algo = {
		name: 'PBKDF2',
		hash: 'SHA-512',
		salt: new TextEncoder().encode('a-unique-salt-for-save'),
		iterations: 1000
	};
	var derived = { name: mode, length: length };
	var encoded = new TextEncoder().encode(saveName);
	var key = await crypto.subtle.importKey('raw', encoded, { name: 'PBKDF2' }, false, ['deriveKey']);
	
	return crypto.subtle.deriveKey(algo, key, derived, false, ['encrypt', 'decrypt']);
};

// Шифрование
async function encrypt (saveName, saveData) {
	var algo = {
		name: 'AES-GCM',
		length: 256,
		iv: crypto.getRandomValues(new Uint8Array(12))
	};
	var key = await genEncryptionKey(saveName, 'AES-GCM', 256);
	var encoded = new TextEncoder().encode(saveData);
	
	return {
		cipherData: await crypto.subtle.encrypt(algo, key, encoded),
		iv: algo.iv
	};
}

// Дешифрование
async function decrypt (saveName,encryptedData) {
	var algo = {
		name: 'AES-GCM',
		length: 256,
		iv: encryptedData.iv
	};
	var key = await genEncryptionKey(saveName, 'AES-GCM', 256);
	var decrypted = await crypto.subtle.decrypt(algo, key, encryptedData.cipherData);

	return new TextDecoder().decode(decrypted);
}

// Экспорт финальной функции
export default async function WebCrypto(saveName, saveData){
	if (typeof saveName !== 'undefined' && typeof saveData !== 'undefined') {
		return await encrypt(saveName, saveData).then(encryptedData => localforage.setItem(saveName, encryptedData))
	} else {
		var Data;
		await localforage.getItem(saveName).then(encryptedData => Data = encryptedData)
		return await decrypt(saveName, Data).then(DecryptedData => JSON.parse(DecryptedData))
	}
}