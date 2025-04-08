import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
      {notification}
    </div>
  )
}

export default Notification