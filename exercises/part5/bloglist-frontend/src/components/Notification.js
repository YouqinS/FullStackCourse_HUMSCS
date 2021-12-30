import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null || !notification.message) {
    return null
  }

  return (
    <div className= {notification.isError ? 'error' : 'notification'}>
      {notification.message}
    </div>
  )
}

export default Notification
