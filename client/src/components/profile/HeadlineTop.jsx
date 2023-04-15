// HeadlineTop component
// Author: Khalid Sadat
// Co-Author: Jonathan Haddad
// Date created: Feb 26, 2023
// date updated : Aprl 1st, 2023
// Description: Headline component for showing the key basic info of user
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useParams } from "react-router-dom";


import EditProfile from "./modal/EditProfile";
import SetupAvatar from "./profilePicture/SetupAvatar";
import Avatar from "../shared/Avatar";
import VerifiedUser from "./VerifiedUser";

export default function HeadlineTop(props) {
  const params = useParams();
  var avatar = props.avatar;
  var profile = props.profile;
  var company = props.company;
  const [connectStatus, setConnectStatus] = React.useState(false);
  const [showCropModal, setShowCropModal] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [connectMessage, setConnectMessage] = React.useState("Connect");

 

  const [connectionsData, setConnectionsData] = useState([]);
  const getAllConnections = async () => {
    const res = await axios.get("/api/user/connection/getAllConnections?", {
      params: { userId: params.id },
    });
    console.log(res.data);
    setConnectionsData(res.data);
  };

  const sendRequest = async () => {
    const res = await axios.post("/api/user/connection/sendConnectionRequest", {
      senderId: localStorage.getItem("uid"),
      receiverId: params.id,
    });
    if (res) {
      setConnectStatus(true);
      setConnectMessage("Sent");
    }
    console.log("Accept: ", res);
  };

  const handleCropModalClose = () => {
    setShowCropModal(false);
  };

  const handleCropModalShow = () => {
    setShowCropModal(true);
  };
  const checkConnectionStatus = async () => {
    const userId = localStorage.getItem("uid");
    const profileId = params.id;
    const res1 = await axios.get("/api/user/connection/getAllConnections?", {
      params: { userId },
    });
    const res2 = await axios.get(
      "/api/user/connection/getConnectionRequests?",
      {
        params: { userId: profileId },
      }
    );
    if (res1.data.filter((item) => item._id === profileId).length > 0) {
      setConnectStatus(true);
      setConnectMessage("Connected");
    } else if (res2.data.filter((item) => item._id === userId).length > 0) {
      setConnectStatus(true);
      setConnectMessage("Sent");
    }
  };

  useEffect(() => {
    checkConnectionStatus();
    getAllConnections();
  }, []);

  return (
    <div className="pl-5 pt-5 pr-5 mt-[-8rem] lg:top-24 md:top-15 w-full mb-2">
      <div className="grid grid-col-2">
        <div className="grid grid-cols-2 gap-2">
          
          <div>
            <div>
              <div className="flex items-center">
                <div className="w-28 h-28 md:w-24 md:h-24 lg:flex justify-center md:block sm:block flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                  <Avatar userId={props.userId} />
                </div>
              </div>
          
              <SetupAvatar
                avatar={avatar}
                isOwner={props.isOwner}
                getUser={props.getUser}
                onEdit={handleCropModalShow}
                setUploadedImage={setUploadedImage}
              />
            </div>
          </div>

          <div className={`grid ${props.isOwner ? 'content-end' : 'content-end'} justify-self-end`}>
            {props.isOwner ? (
                <div style={{ marginLeft: "auto" }}>
                  <label htmlFor="edit-profile-modal" className="">
                    <BiPencil className="cursor-pointer text-xl" />
                  </label>
                </div>
              ) :
                <button
                  onClick={() => sendRequest()}
                  disabled={connectStatus}
                  className={`w-[6rem] primaryBtn btn btn-sm bg-sky-400 font-light`}
                  style={
                    connectStatus
                      ? { cursor: "not-allowed", color: "white" }
                      : {}
                  }
                >
                  {connectMessage}
                </button>
              }
          </div>
          <EditProfile
            profile={profile}
            avatar={avatar}
            getUser={props.getUser}
          />
        </div>
      </div>

      <div>
        <div className="font-extrabold text-xl" style={{fontWeight: 'bolder'}}>
            <div className="flex items-center">
              <div className="w-auto">
                {profile.name}
              </div>
              <VerifiedUser name={profile.name} />
            </div>

        </div>
        <div className="text-sm">
          {props.position}
        </div>
        <div className="text-[0.7rem] text-gray-600">
          {props.company} • {props.country}
        </div>
        <div className="text-sm mt-2 font-bold">
          {connectionsData && (connectionsData.length <= 1 ?  connectionsData.length + ' connection' : connectionsData.length + ' connections')}
        </div>
      </div>
    </div>
  );
}
