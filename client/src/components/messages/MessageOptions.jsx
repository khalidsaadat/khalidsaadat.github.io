//Messages
//Author: Daria Koroleva
//Created: March 24,2023
//Description: Component to display an options menu

import React from 'react'
import { HiEllipsisHorizontal } from 'react-icons/hi2';

function MessageOptions(props) {

    const { id, removeMessage, canReport, selectReport } = props;

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <HiEllipsisHorizontal />
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-30">
                {canReport &&
                    (<li>
                        <a onClick={() => selectReport(id)}
                            className="active:text-current active:bg-transparent">
                            Report
                        </a>
                    </li>)
                }
                <li>
                    <a onClick={() => removeMessage(id)}
                        className="active:text-current active:bg-transparent">
                        Delete
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default MessageOptions