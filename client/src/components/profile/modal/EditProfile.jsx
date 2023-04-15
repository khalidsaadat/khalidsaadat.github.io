// Edit profile modal component
// Author: Khalid Sadat
// Date created: March 5, 2023
// Description: edit profile modal component for editing basic information such as name and password

import React, { useEffect, useState, useTransition } from 'react'
import axios from 'axios';
import { BiPencil } from 'react-icons/bi'

export default function EditProfile(props) {
    var profile_pic = props.profile_pic;
    var profile = props.profile;

    const [user_fullname, setName] = useState('');
    const [user_email, setEmail] = useState('');
    const [profile_updated, setProfileUpdated] = useState('');

    useEffect( () => {
        setName(profile.name);  
        setEmail(profile.email);
    }, [profile]);

    const handleName = (e) => {
        const updated_name = e.target.value;
        setName(updated_name);
    }

    const handleEmail = (e) => {
        const updated_email = e.target.value;
        setEmail(updated_email);
    }

    const updateProfile = async (e) => {
        e.preventDefault();

        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }

        const updated_profile = {id: profile._id, name: user_fullname, email: user_email};
        
        await axios.put('/api/account/updateProfile/', updated_profile, headers)
        .then((res) => {
            console.log("Updating profile", res);
            props.getUser();
            setProfileUpdated(1);
        })
        .catch(err => {console.log('Error', err); setProfileUpdated(2)})
    }



    const [current_pass, setCurrentPass] = useState('');
    const [new_pass, setNewPass] = useState('');
    const [confirm_pass, setConfirmPass] = useState('');

    const [pass_verified, setPassVerified] = useState('');

    const handleCurrentPass = (e) => {
        const current_pass = e.target.value;
        console.log(current_pass);
        setCurrentPass(current_pass);
    }

    const handleNewPass = (e) => {
        const new_pass = e.target.value;
        console.log(new_pass);
        setNewPass(new_pass);
    }

    const handleConfirmPass = (e) => {
        const confirm_pass = e.target.value;
        console.log(confirm_pass);
        setConfirmPass(confirm_pass);
    }


    const updatePassword = async (e) => {
        e.preventDefault();

        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }

        const password_changed = {id: profile._id, oldPassword: current_pass, newPassword: new_pass}

        // verifyPassword(current_pass);

        await axios.put('/api/account/updatePassword', password_changed, headers)
        .then((res) => {
            console.log("password changed successfully");
            // props.getUser();
            setPassVerified(1);
        })
        .catch(err => setPassVerified(2))

        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");

    }

    const verifyPassword = (currentPass) => {
        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }

        const password_auth = {email: user_email, password: current_pass};
        axios.post('/api/account/matchPassword', password_auth, headers)
        .then((res) => {
            console.log(res.data.message);
            // props.getUser();
            setPassVerified(res.data.message);
        })
        .catch(err => setPassVerified(false))
    }

    // useEffect (() => {
    //     // updatePassword();
    //     // changePassword();
    //     setPassVerified(pass_verified)
    // }, [pass_verified])



    const deleteAccount = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (!confirmation) {
            return;
        }

        const token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';

        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        };

        await axios.delete(`/api/account/deleteUser?id=${profile._id}`, { headers })
            .then((res) => {
                console.log("Account deleted successfully", res);

                localStorage.removeItem("loggedIn");

                window.location.reload()
            })
            .catch((err) => {
                console.log("Error deleting account", err);
            });
    };


    

    return (
        <div>
            <input type="checkbox" id="edit-profile-modal" className="modal-toggle" />
            <div className="modal items-start pt-10">
                <div className="modal-box w-11/12 max-w-5xl editProfileModals">
                    <label htmlFor="edit-profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div>
                        <h1 className="text-xl font-semibold mb-5">Edit Profile</h1>
                        <hr />

                        <div>
                            <div className=" mx-auto">
                                <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                                    <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                    
                                    <li className="mr-2" role="presentation">
                                        <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">
                                            Basic Info
                                        </button>
                                    </li>
                                    <li className="mr-2" role="presentation">
                                        <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active" id="password-tab" data-tabs-target="#password_tab" type="button" role="tab" aria-controls="password_tab" aria-selected="false">
                                            Password
                                        </button>
                                    </li>
                                    <li className="mr-2" role="presentation">
                                        <button className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
                                    </li>
                                    </ul>
                                </div>
                                <div id="myTabContent">
                                    <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <form>
                                            <div className="form-control w-full max-w-xs">
                                                {(profile_updated == 1) &&
                                                    <div id="alert-1" class="flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                                        <span class="sr-only">Info</span>
                                                        <div class="ml-3 text-sm font-medium">
                                                            Profile updated successfully.
                                                        </div>
                                                        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                                                            <span class="sr-only">Close</span>
                                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                        </button>
                                                    </div>
                                                }
                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Full Name</span>
                                                    </label>
                                                    <input type="text" value={user_fullname} onChange={handleName} name="fullname" placeholder="Full Name" className="input input-sm input-bordered w-full max-w-xs" />
                                                </div>

                                                <div className='mt-5'>
                                                    <label className="label">
                                                        <span className="label-text">Email Address</span>
                                                    </label>
                                                    <input type="text" value={user_email} onChange={handleEmail}  name="email" placeholder="Email Address" className="input input-sm input-bordered w-full max-w-xs" />
                                                </div>

                                            </div>

                                            <button onClick={updateProfile} className='primaryBtn btn btn-sm mt-5'>Update</button>
                                        </form>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800" id="password_tab" role="tabpanel" aria-labelledby="password-tab">
                                        <form>
                                            <div className="form-control w-full max-w-xs">

                                                {(pass_verified == 1) &&
                                                    <div id="alert-1" class="flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                                        <span class="sr-only">Info</span>
                                                        <div class="ml-3 text-sm font-medium">
                                                            Password changed successfully.
                                                        </div>
                                                        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                                                            <span class="sr-only">Close</span>
                                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                        </button>
                                                    </div>
                                                }
                                                

                                                {(pass_verified == 2) &&
                                                    <div id="alert-2" class="flex p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                                        <span class="sr-only">Info</span>
                                                        <div class="ml-3 text-sm font-medium">
                                                            Error changing your password.
                                                        </div>
                                                        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close">
                                                            <span class="sr-only">Close</span>
                                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                        </button>
                                                    </div>
                                                }

                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Type your current password</span>
                                                    </label>
                                                    <input type="password" value={current_pass} onChange={handleCurrentPass} name="current_password" placeholder="Current Password" className="input input-sm input-bordered w-full max-w-xs" required/>
                                                </div>

                                                <div className='mt-5'>
                                                    <label className="label">
                                                        <span className="label-text">Type your new password</span>
                                                    </label>
                                                    <input type="password" value={new_pass} onChange={handleNewPass}  name="new_password" placeholder="New Password" className="input input-sm input-bordered w-full max-w-xs" required/>
                                                </div>

                                                <div className='mt-5'>
                                                    <label className="label">
                                                        <span className="label-text">Retype your password</span>
                                                    </label>
                                                    <input type="password" value={confirm_pass} onChange={handleConfirmPass}  name="confirm_password" placeholder="Confirm Password" className="input input-sm input-bordered w-full max-w-xs" required/>
                                                </div>

                                            </div>

                                            <button onClick={updatePassword} className='primaryBtn btn btn-sm mt-5'>Update</button>
                                        </form>
                                    </div>
                                    
                                    {/* Skeleton element */}
                                    <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                                        {/* <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                                            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                                                <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                                            </div>
                                            <div className="w-full">
                                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                                                <button onClick={deleteAccount} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                    Delete Account
                                                </button>
                                            </div>
                                            <span className="sr-only">Loading...</span>
                                        </div> */}
                                        <div>
                                            To delete your, click the button below.
                                        </div>
                                        <button onClick={deleteAccount} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete Account
                                        </button>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}