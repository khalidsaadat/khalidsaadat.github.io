//Messages
//Author: Daria Koroleva
//Created: March 25,2023
//Description: Show report reasons menu

import React, { useState } from 'react';

function ReportMenu(props) {

    const { reportMessage, closeReportMenu } = props;
    const [selectedReportType, setSelectedReportType] = useState('SPAM');

    const reportTypes = [
        { label: "It is spam or a scam", value: "SPAM" },
        { label: "It is harassment", value: "HARASSMENT" },
        { label: "It is inappropiate", value: "INAPPROPIATE" },
        { label: "I think this account is hacked", value: "HACKED" },
        { label: "I think it is hate speech", value: "HATE" }
    ];

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="absolute inset-0 bg-black opacity-60"
                onClick={closeReportMenu}
            ></div>
            <div className="relative p-6 bg-white rounded-lg shadow-xl">
                <h3 className="font-bold text-lg">Why are you reporting this message?</h3>

                {
                    reportTypes.map((type) => {
                        return (
                            <div key={type.value} className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">{type.label}</span>
                                    <input
                                        type="radio"
                                        name="radio-10"
                                        className="radio"
                                        checked={selectedReportType === type.value}
                                        onChange={() => setSelectedReportType(type.value)} />
                                </label>
                            </div>)
                    })
                }
                <div className="flex mt-2 space-x-2">
                    <button onClick={closeReportMenu} className="btn btn-sm">Cancel</button>
                    <button onClick={() => reportMessage(selectedReportType)} className="btn btn-sm">Report</button>
                </div>
            </div>
        </div>
    )
}

export default ReportMenu





