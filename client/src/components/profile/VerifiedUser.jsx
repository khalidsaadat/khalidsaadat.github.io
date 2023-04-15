// Profile cover component
// Author: Khalid Sadat
// Date created: March 3, 2023
// Description: Project cover component for showing the the profile cover

import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

export default function UserIm(props) {
    var name = props.name;
    var type = props.type;

    // Verified Users
    const verifiedUser = ["Khalid Sadat", "Nadine El-Mufti", "Daria Koroleva", "Mohammad Salim", "Ayeshah Rehman", "Saad Hanna", "Hadi Hawi", "Jonathan Haddad"];
    const currentUser = name + "";
    const currentUserWords = currentUser.split(" ");

    const matchingTexts = verifiedUser.filter(user => {
        const userWords = user.split(" ");
        const matchingWords = currentUserWords.filter(word => userWords.includes(word));
        return matchingWords.length >= 2;
    });

    return (
        <div className={`w-auto verifiedUser text-[1rem] pl-1 ${type == 'dms' ? '' : 'tooltip tooltip-right'}`} data-tip="Verified">
            {matchingTexts.length > 0 && (
                <MdVerified />
            )}
        </div>
    );
}
