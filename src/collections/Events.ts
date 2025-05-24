import { CollectionConfig } from "payload"

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'start', 'end', 'googleCalendarId']
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.roles?.includes('admin') || false,
    update: ({ req }) => req.user?.roles?.includes('admin') || false,
    delete: ({ req }) => req.user?.roles?.includes('admin') || false,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'start',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'yyyy-MM-dd HH:mm',
        },
      },
    },
    {
      name: 'end',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'yyyy-MM-dd HH:mm',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'attendees',
      type: 'array',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'responseStatus',
          type: 'select',
          options: ['accepted', 'declined', 'tentative', 'needsAction'],
        },
      ],
    },
    {
      name: 'recurrence',
      type: 'text',
      admin: {
        description: 'RRULE string (e.g., FREQ=WEEKLY;BYDAY=MO)',
      },
    },
    {
      name: 'googleCalendarId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Google Calendar Event ID (used for syncing)',
      },
    },
    {
      name: 'syncedWithGoogle',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
  ],
}
