const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  const style = {
    padding: 5,
    fontSize: 20,
    border: '3px solid rgba(255, 0, 0, 1)',
    borderRadius: 5,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
