//Messages
//Author: Daria Koroleva
//Created: March 27,2023
//Description: Display attachment
import React from 'react';

import { FaFileAlt } from 'react-icons/fa';

function Attachment(props) {

    const { attachments, openPasswordDecrypt } = props;

    return (
        <div>
            {attachments.length !== 0 && (
                    <div className="flex items-center mt-2">
                        <FaFileAlt />
                        <button                            
                            onClick={() => openPasswordDecrypt(`${attachments[0].filePath}`, attachments[0].fileName)}
                            className="download-link"
                        >
                            {attachments[0].fileName}
                        </button>
                    </div>
            )}
            
        </div>
        
    )
}

export default Attachment
