//Messages
//Author: Daria Koroleva
//Created: March 31,2023
//Description: Download and decrypt file
import React, { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { decryptFileWithPassword, deriveSaltAndIV } from "./Encryption";
import axios from 'axios';

function DecryptFile(props) {

    const {encryptedFileUrl,encryptedFileName, closePasswordDecrypt } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');    
    const [error, setError] = useState('');

    function handleOnChangePassword(event) {
        const newPassword = event.target.value;        
        setPassword(newPassword);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    async function downloadFile(fileUrl, fileName, password) {

        try {

            const { salt, iv } = await deriveSaltAndIV(password);

            const response = await axios.get("\\" + fileUrl, {            
                responseType: 'blob',
            });

            const decryptedFile = await decryptFileWithPassword(response.data, password, salt, iv);

            // Create a blob URL for the file
            const fileBlobUrl = URL.createObjectURL(decryptedFile);

            // Create an anchor element and trigger a download
            const link = document.createElement('a');
            link.href = fileBlobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            // Clean up the DOM after download
            document.body.removeChild(link);
            setError('');
            closePasswordDecrypt();
            
        } catch (error) {
            setError(error.message);            
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black opacity-60"
                onClick={closePasswordDecrypt}
            ></div>
            <div className="relative p-6 bg-white rounded-lg shadow-xl">

                <div className='p-2 flex items-center'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Type password for the file..."
                        className={`input input-bordered w-full max-w-xs  input-sm ${error ? 'input-error' : ''}`}                        
                        onChange={handleOnChangePassword}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="p-2"
                    >
                        {showPassword ? (
                            <FaEye className="h-5 w-5" />
                        ) : (
                            <FaEyeSlash className="h-5 w-5" />
                        )}
                    </button>                    
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <div className="flex mt-2 space-x-2">
                    <button onClick={closePasswordDecrypt} className="btn btn-sm">Cancel</button>
                    
                    <button onClick={() => downloadFile(encryptedFileUrl,encryptedFileName, password)} className="btn btn-sm">Download</button> 
                </div>
            </div>
        </div>
    )
}

export default DecryptFile





