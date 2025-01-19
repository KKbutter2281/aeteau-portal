'use client'

import React, { createContext, useContext, useState } from 'react'

type NotificationType = 'success' | 'error' | 'info'

interface Notification {
  id: string
  type: NotificationType
  message: string
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (type: NotificationType, message: string) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (type: NotificationType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    setNotifications((prev) => [...prev, { id, type, message }])
    setTimeout(() => removeNotification(id), 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

