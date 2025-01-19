'use client'

import { useNotification } from './NotificationProvider'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { XIcon } from 'lucide-react'

export function Notifications() {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          variant={notification.type === 'error' ? 'destructive' : 'default'}
          className="w-[350px] shadow-lg"
        >
          <AlertDescription className="flex items-center justify-between">
            {notification.message}
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 rounded-full p-1 hover:bg-accent"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

