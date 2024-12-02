import { h } from 'vue'

import DropdownAction from '@/components/BooksTable/data-table-dropdown.vue'

export const columns = [
  {
    accessorKey: 'title',
    header: () => h('div', { class: 'text-left' }, 'title'),
    cell: ({ row }) => {
      const title = row.getValue('title')

      return h('div', { class: 'text-left font-medium' }, title)
    },
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'id'),
    cell: ({ row }) => {
      const id = row.getValue('id')

      return h('div', { class: 'text-left font-medium' }, id)
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => h('div', { class: 'text-left' }, 'createdAt'),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt')

      return h('div', { class: 'text-left font-medium' }, createdAt)
    },
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-left' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-left font-medium' }, formatted)
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          payment,
        }),
      )
    },
  },
]
