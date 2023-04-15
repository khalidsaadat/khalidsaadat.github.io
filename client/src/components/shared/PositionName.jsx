// Position name
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: provides current position name of a user

import React, { useEffect, useState } from "react";
import axios from "axios";
import profile_pic from "../../static/images/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { RiCalendarEventFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { GrGroup } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';

export default function PositionName(props) {
    const id = props.id;

    const [profile, setProfile] = useState([]);
    const [position, setPosition] = useState("");

    useEffect(() => {
        axios.get('/api/account/getUser?', {
            params: {id}
        })
        .then(res => {
            setProfile(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    
    
    useEffect(async () => {
        var occupations = await profile.experience;
        occupations = occupations[occupations.length - 1];
        const pos_comma_split = occupations.indexOf(",");
        var position_str = occupations.substring(0, pos_comma_split);
        setPosition(position_str);
    });

    return (
        <div>
            {position}
        </div>
    );
}