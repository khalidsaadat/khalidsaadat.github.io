//Messages
//Author: Daria Koroleva
//Created: March 30,2023
//Description: Provide file encryption capabilities 
async function blobToArrayBuffer(blob) {
    return await new Response(blob).arrayBuffer();
}

function arrayBufferToBlob(buffer, type) {
    return new Blob([buffer], { type: type });
}

async function deriveKeyFromPassword(password, salt) {
    const enc = new TextEncoder();
    const passwordBuffer = enc.encode(password);
    const importedPassword = await crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256",
        },
        importedPassword,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
    return key;
}

async function decryptFileWithPassword(encryptedFile, password, salt, iv) {
    try {
        const key = await deriveKeyFromPassword(password, salt);
        const encryptedFileBuffer = await blobToArrayBuffer(encryptedFile);
        const decryptedContent = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv },
            key,
            encryptedFileBuffer
        );
        const decryptedFile = arrayBufferToBlob(decryptedContent, encryptedFile.type);
        return decryptedFile;
    }
    catch (error){
        throw new Error('Wrong password');
    }
    
}


async function deriveSaltAndIV(password) {
    const enc = new TextEncoder();
    const passwordBuffer = enc.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
    const hashArray = new Uint8Array(hashBuffer);
    const salt = hashArray.slice(0, 16);
    const iv = hashArray.slice(16, 28);
    return { salt, iv };
}

async function encryptFileWithPassword(file, password) {
    const { salt, iv } = await deriveSaltAndIV(password);
    const key = await deriveKeyFromPassword(password, salt);
    const fileBuffer = await file.arrayBuffer();
    const encryptedContent = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        fileBuffer
    );
    const encryptedFile = arrayBufferToBlob(encryptedContent, file.type);
    return { encryptedFile };
}

export { decryptFileWithPassword, deriveSaltAndIV, encryptFileWithPassword };