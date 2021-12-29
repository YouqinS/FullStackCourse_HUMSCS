const Logout = ({ user, setUser }) => {

    const handleLogout = async () => {
        console.log('logging out')
        window.localStorage.clear()
        setUser(null)
    }

    return (
        <p>{user.username} logged in
            <button onClick={handleLogout}>logout</button>
        </p>
    )
}

export default Logout
