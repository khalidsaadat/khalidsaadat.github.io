// language modal component
// Author: Khalid Sadat
// Date created: March 3, 2023
// Description: language modal component for adding a new language

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Buffer } from 'buffer';

import { BiPencil } from 'react-icons/bi'

export default function Language(props) {
    let id = props.id;
    // let id = "63eabb9c07f2dc10446a1c7c";
    var languages = props.languages;
    
    const [language, setLanguage] = useState('');

    const handleLanguage = (e) => {
        const new_language = e.target.value;
        console.log(new_language);
        setLanguage(new_language);
    }

    const addLanguage = async (e) => {
        e.preventDefault();
        
        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
   
        
        const newLanguage = {id: id, language: language};
        console.log(newLanguage);

        await axios.post('/api/user/property/addLanguage', newLanguage, headers)
        .then((res) => {
            console.log("Adding", res);
            props.getUser();
        })
        .catch(err => console.log('Error', err))

        setLanguage("");
    }
    
    return (
        <div>
            <input type="checkbox" id="language-modal" className="modal-toggle" />
            <div className="modal items-start pt-10">
                <div className="modal-box w-11/12 max-w-5xl editProfileModal">
                    <label htmlFor="language-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-xl font-semibold mb-5'>Edit Languages</h1>
                    <div>
                        <form>
                            <div className="">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                        New Language
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input value={language} onChange={handleLanguage} placeholder="Language" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text"/>
                                </div>
                            </div>
                            <button onClick={addLanguage} className='primaryBtn btn mt-5'>Add</button>
                            {/* <input type="submit" /> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}