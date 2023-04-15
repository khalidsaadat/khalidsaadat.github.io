// User name
// Author: Khalid Sadat
// Date created: April 4, 2023
// Description: provides user name of the user

import React, { useEffect, useState } from "react";
import axios from "axios";
import VerifiedUser from '../profile/VerifiedUser';

export default function ShowUserName(props) {
    var id = props.id;

    const [username, setUsername] = useState('');

    useEffect(() => {
        axios.get('/api/account/getUser?', {
            params: {id}
        })
        .then(res => {
            setUsername(res.data.name);

        }).catch(err => {
            setUsername(
                <>
                Undefined&nbsp;
                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Doesn't Exist</span>
                </>
            );
            console.log(err)
        })
    }, []);



    return (
        <span>
            <div className="flex items-center">
                <div className="w-auto">
                    {username}
                </div>
                <VerifiedUser name={username} />
            </div>
        </span>
    );
}