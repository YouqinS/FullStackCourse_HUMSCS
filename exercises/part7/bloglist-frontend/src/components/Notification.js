import React from 'react'
import {useSelector} from "react-redux";
import {Alert} from "react-bootstrap";

const Notification = () => {
  const notification = useSelector(state => state.notification.notification)

  if (!notification || !notification.message) {
    return null
  }

  return (
    <Alert className= {notification.isError ? 'error' : 'notification'}>
      {notification.message}
    </Alert>
  )
}

export default Notification
