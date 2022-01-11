import React from 'react'

const Logout = ({ user, setUser }) => {

  const handleLogout = async () => {
    console.log('logging out')
    window.localStorage.clear()
    setUser(null)
  }

  return user ?
    (
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    )
    :
    ''
}

export default Logout
