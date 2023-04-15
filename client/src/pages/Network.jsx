import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import profile_pic from "../static/images/profile.jpg";
import StartDM from "../components/messages/StartDM"
import { useNavigate } from "react-router-dom";
import PositionName from "../components/shared/PositionName";
import VerifiedUser from '../components/profile/VerifiedUser';
import { Link } from "react-router-dom";

import { RiSendPlaneFill } from 'react-icons/ri';
import { HiUserRemove } from 'react-icons/hi';
import Avatar from "../components/shared/Avatar";


function Network() {
  const [networkData, setNetworkData] = useState([]);
  const [connectionsData, setConnectionsData] = useState([]);

  const getRequests = async () => {
    const res = await axios.get("/api/user/connection/getConnectionRequests?", {
      params: { userId: localStorage.getItem("uid") },
    });
    setNetworkData(res.data);
  };

  const getAllConnections = async () => {
    const res = await axios.get("/api/user/connection/getAllConnections?", {
      params: { userId: localStorage.getItem("uid") },
    });
    console.log(res.data);
    setConnectionsData(res.data);
  };

  const rejectRequest = async (senderId) => {
    const receiverId = localStorage.getItem("uid");
    const res = await axios.post(
      "/api/user/connection/rejectConnectionRequest",
      {
        senderId,
        receiverId,
      }
    );
    getRequests();
    console.log("Reject: ", res);
  };

  const acceptRequest = async (senderId) => {
    const receiverId = localStorage.getItem("uid");
    const res = await axios.post(
      "/api/user/connection/acceptConnectionRequest",
      {
        senderId,
        receiverId,
      }
    );
    getAllConnections();
    getRequests();
    console.log("Accept: ", res);
  };

  const removeConnections = async (connectionId) => {
    const userId = localStorage.getItem("uid");
    const res = await axios.post("/api/user/connection/removeConnection", {
      connectionId,
      userId,
    });
    getAllConnections();
    console.log("Removed connection: ", res);
  };

  useEffect(() => {
    getAllConnections();
    getRequests();
  }, []);

  return (
    <div className="flex justify-center items-center mt-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Network</title>
      </Helmet>

      <div class="flex justify-center w-full md:w-3/4 lg:w-2/3 lg:p-5">
        {/* Profile */}
        <div class="w-full lg:w-2/3 bg-white relative lg:rounded-t-xl">

          {/* Network invitations */}
          {networkData.length != 0 && 
          <>
          <div className="p-5">
              <h1 className="text-xl font-semibold mb-5">Network Invitations</h1>
              <div className="w-full bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800">
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

                    {networkData.map((network, index) => (
                      <div>
                        <li className="p-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800">
                              {/* <img className="w-12 h-12 rounded-full" src={profile_pic} alt="Neil image" /> */}
                              <Avatar userId={network._id} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                <div className="flex items-center">
                                    <div className="w-auto">
                                        {network.name}
                                    </div>
                                    <VerifiedUser name={network.name} />
                                </div>
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                <PositionName id={network._id} />
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {/* <StartDM userId={connections._id} userName={connections.name} /> */}
                              <button onClick={() => acceptRequest(network._id)} className="mr-2 whiteBtn btn btn-sm bg-sky-400 font-light mt-3" >
                                Accept
                              </button>

                              <button onClick={() => rejectRequest(network._id)} className="mr-2 whiteBtn btn btn-sm bg-sky-400 font-light mt-3" >
                                Ignore
                              </button>
                            </div>
                          </div>
                        </li>
                        <hr />
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
          </div>
          </>
          }

          {/* Connection */}
          <div className={`p-5 ${networkData.length > 0 ? 'mt-5' : ''}`}>
            <h1 className="text-xl font-semibold mb-5">Your Connections</h1>
              <div className="w-full bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800">
                <div className="flow-root">
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    
                    {connectionsData && connectionsData.length == 0 && 
                      <div className="text-center">
                        You do not have any people in your network.
                      </div>
                    }

                    {connectionsData.map((connections) => (
                      <div>
                        <li className="p-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-800">
                              {/* <img className="w-12 h-12 rounded-full" src={profile_pic} alt="Neil image" /> */}
                              <Avatar userId={connections._id} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link to={`/profile/${connections._id}`}>
                                <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                                  <div className="flex items-center">
                                      <div className="w-auto">
                                          {connections.name}
                                      </div>
                                      <VerifiedUser name={connections.name} />
                                  </div>
                                </p>
                              </Link>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                <PositionName id={connections._id} />
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                              {/* <StartDM userId={connections._id} userName={connections.name} /> */}
                              <Link to={`/messages/${connections._id}/${connections.name}`}>
                                <div data-tooltip-target="tooltip-network-msg" className="mr-2 btn btn-ghost btn-circle" >
                                  <RiSendPlaneFill  className="text-xl"/>
                                </div>
                              </Link>
                              <div id="tooltip-network-msg" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                  Message
                                  <div class="tooltip-arrow" data-popper-arrow></div>
                              </div>

                              <button onClick={() => removeConnections(connections._id)} data-tooltip-target="tooltip-network-remove" className="mr-2 btn btn-ghost btn-circle" >
                                <HiUserRemove className="text-xl" />
                              </button>
                              <div id="tooltip-network-remove" role="tooltip" class="absolute text-sm z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                  Remove
                                  <div class="tooltip-arrow" data-popper-arrow></div>
                              </div>
                              {/* <button
                                className="w-20 primaryBtn btn btn-sm bg-sky-400 font-light"
                                onClick={() => removeConnections(connections._id)}
                              >
                                Remove
                              </button> */}
                            </div>
                          </div>
                        </li>
                        <hr />
                      </div>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Network;
