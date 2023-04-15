//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Component to render Send a message

import React, { useState, useRef } from 'react';
import { FaPaperclip, FaFileAlt, FaEyeSlash, FaEye } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';


function MessageSender(props) {

    const fileInputRef = useRef(null);
    const {receiver, addMessage } = props;
    const [messageText, setMessageText] = useState('');
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    function handleOnChange(event) {
        const newText = event.target.value;
        setMessageText(newText);        
    }

    function handleOnChangePassword(event) {
        const newPassword = event.target.value;
        validatePassword(newPassword);
        setPassword(newPassword);
    }

    function validatePassword(newPassword){
        if (newPassword.trim() === '') {
            setError('Please enter a password');
        }
        else if (!isPasswordSafe(newPassword)) {
            setError('Password must be at least 8 characters long.');
        }
        else {
            setError('');
        }        
    }

    const isPasswordSafe = (password) => {
        const minLength = 8;
        return password.length >= minLength;
    };

    function handleSend() {

        if( !selectedFile || (!error && isPasswordSafe(password))){            
            addMessage(messageText, receiver, selectedFile, password);
            setMessageText('');
            clearFile();
        }
        else{
            validatePassword(password);
        }
    }

    function clearFile() {
        setSelectedFile(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='w-full flex-col'>
            {selectedFile && (
                <div className="m-2 shadow-lg">
                    <div className="flex items-center justify-start p-2">
                        <FaFileAlt />
                        <p className="ml-2">{selectedFile.name}</p>
                        <div className="ml-auto">
                            <div className='p-2 cursor-pointer' onClick={(e) => {
                                clearFile();
                            }}>
                                <RxCross2 />
                            </div>
                        </div>
                    </div>
                    <div className='p-2'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Type password for the file..."
                            //className="input input-bordered w-full max-w-xs" 
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
                        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                    </div>
                </div>)}
            <div className='w-full p-2'>
                <textarea
                    placeholder="Write a message..."
                    className="textarea textarea-bordered textarea-lg w-full"
                    value={messageText}
                    onChange={handleOnChange}>
                </textarea>
            </div>

            <div className='flex w-full justify-between'>
                <div>
                    <label className="mr-2 btn btn-ghost btn-circle" style={{ fontSize: "25px" }}>
                        <div className="relative">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="absolute top-0 left-0  w-full h-full opacity-0 cursor-pointer"
                            />
                            <FaPaperclip />
                        </div>
                    </label>
                </div>

                <button className="mt-2 btn btn-sm" onClick={handleSend}>Send</button>
            </div>

        </div>
    )
}

export default MessageSender



