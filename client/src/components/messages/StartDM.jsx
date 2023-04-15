//Messages
//Author: Daria Koroleva
//Created: March 30,2023
//Description: Start a DM
import React from 'react'
import { Link } from "react-router-dom";

function StartDM(props) {

    const { userId , userName} = props;
    return (
        <div>
            <Link to={`/messages/${userId}/${userName}`}>
            <button className="w-20 primaryBtn btn btn-sm bg-sky-400 font-light">
                Message
            </button>
            </Link>            
        </div>
    )
}

export default StartDM