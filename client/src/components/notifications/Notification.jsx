import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import Avatar from '../shared/Avatar'

function Notification(props) {

  const { notification, removeNotification } = props;

  return (
    <div className="w-full sm:w-3/4 flex gap-5 shadow-lg p-2">
      <div class="avatar">
        <div class="w-14 h-14 rounded-full">          
          <Avatar userId={notification.userId} />
        </div>
      </div>
      <div className='flex-grow'>
        <p className='text-left'>
          <b>{notification.userName} {notification.type}</b>  {notification.description}
        </p>
      </div>
      <div className='flex flex-col items-center w-1/8'>
        <div className="px-6 text-sm text-gray-500">
          {notification.age}
        </div>
        <div className='p-2 cursor-pointer' onClick={(e) => {  
            removeNotification(notification.id);
          }}>
            <FaTrashAlt />
          </div>
  
      </div>

    </div>


  )
}

export default Notification





