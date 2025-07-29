'use client';

import * as React from 'react';
import {
  Bell,
  Check,
  Dot,
  MoreHorizontal,
  Settings,
  Trash2,
  User,
  MessageSquare,
  Calendar,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNotifications } from '@/hooks/use-notifications';
import { Notification } from '@/payload-types';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

// -- Helpers for icon, color, and link based on relation --
const getNotificationIcon = (notification: Notification) => {
  if (!notification.relatedTo) return Bell;
  switch (notification.relatedTo.relationTo) {
    case 'events':
      return Calendar;
    case 'tasks':
      return CheckCircle2;
    case 'projects':
      return FileText;
    case 'chats':
    case 'messages':
      return MessageSquare;
    case 'users':
      return User;
    case 'notes':
      return FileText;
    default:
      return Bell;
  }
};

const getNotificationColor = (notification: Notification) => {
  if (!notification.relatedTo) return 'bg-blue-500';
  switch (notification.relatedTo.relationTo) {
    case 'events':
      return 'bg-purple-500';
    case 'tasks':
      return 'bg-green-500';
    case 'projects':
      return 'bg-orange-500';
    case 'chats':
    case 'messages':
      return 'bg-blue-500';
    case 'users':
      return 'bg-indigo-500';
    case 'notes':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

const getNotificationLink = (notification: Notification) => {
  if (!notification.relatedTo) return '#';
  const { relationTo, value } = notification.relatedTo;
  const id = typeof value === 'string' ? value : value?.id;
  switch (relationTo) {
    case 'events':
      return `/dashboard/events/${id}`;
    case 'tasks':
      return `/dashboard/tasks/${id}`;
    case 'projects':
      return `/dashboard/projects/${id}`;
    case 'chats':
      return `/messaging/chats/${id}`;
    case 'messages':
      return `/messaging/${id}`;
    case 'users':
      return `/dashboard/users/${id}`;
    case 'notes':
      return `/dashboard/notes/${id}`;
    default:
      return '#';
  }
};

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const Icon = getNotificationIcon(notification);
  const colorClass = getNotificationColor(notification);
  const link = getNotificationLink(notification);
  const isUnread = notification.statusRead === 'unread';
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      className={`group relative p-4 hover:bg-gray-50 transition-colors ${
        isUnread ? 'bg-blue-50/50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${colorClass} flex items-center justify-center`}
        >
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/dashboard/notifications/${notification.id}`} className="flex-1">
              <h4
                className={`text-sm text-gray-900 line-clamp-1 ${
                  isUnread ? 'font-semibold' : 'font-medium'
                }`}
              >
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1 break-words w-[40%]">
                {notification.content}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <time className="text-xs text-gray-500">{timeAgo}</time>
                {isUnread && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700"
                  >
                    New
                  </Badge>
                )}
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {isUnread && (
                  <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
                    <Check className="w-4 h-4 mr-2" />
                    Mark as read
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => onDelete(notification.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {isUnread && (
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
      )}

      {link !== '#' && <Link href={link} className="absolute inset-0 z-10" />}
    </div>
  );
}

export function NotificationsTray() {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    notifications = [],
    loadingNotifications,
    updateNotification,
    removeNotification,
    loadNotifications,
  } = useNotifications();

  React.useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = React.useMemo(
    () =>
      Array.isArray(notifications)
        ? notifications.filter((n) => n.statusRead === 'unread').length
        : 0,
    [notifications]
  );

  const handleMarkAsRead = React.useCallback(
    (id: string) => {
      updateNotification(id, { statusRead: 'read' });
    },
    [updateNotification]
  );

  const handleDelete = React.useCallback(
    (id: string) => {
      removeNotification(id);
    },
    [removeNotification]
  );

  const handleMarkAllAsRead = React.useCallback(() => {
    notifications
      .filter((n) => n.statusRead === 'unread')
      .forEach((n) => updateNotification(n.id, { statusRead: 'read' }));
  }, [notifications, updateNotification]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative data-[state=open]:bg-accent h-8 w-8 bg-gray-50 hover:bg-gray-100"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs font-medium"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={8}
          className="
            w-screen max-w-[90vw]
            sm:w-80
            p-0 overflow-hidden rounded-lg shadow-lg border
          "
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between p-2 border-b bg-white">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 text-[24px]">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-xs h-7 px-2"
                >
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="h-[60vh] sm:max-h-96">
            {loadingNotifications ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Bell className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 font-medium">No notifications</p>
                <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <>
              <Separator />
              <div className="p-3 bg-gray-50">
                <Link href="/dashboard/notifications">
                  <Button variant="ghost" className="w-full text-sm h-8">
                    View all notifications
                  </Button>
                </Link>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
