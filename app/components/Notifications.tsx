'use client'

import { useNotification } from './NotificationProvider'

export default function Notifications() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`mb-2 p-4 rounded-md shadow-md ${
            notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          <p>{notification.message}</p>
          <button
            onClick={() => removeNotification(index)}
            className="mt-2 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
}

