import React from 'react'
import {useSelector} from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification.notification)

  if (!notification || !notification.message) {
    return null
  }

  return (
    <div className= {notification.isError ? 'error' : 'notification'}>
      {notification.message}
    </div>
  )
}

export default Notification
