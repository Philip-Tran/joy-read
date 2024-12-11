import type { BookListingCard } from '@/types/BookTypes'
import DropdownAction from '@/pages/BookDir/components/books/data-table-dropdown.vue'

import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import dayjs from 'dayjs'

export const columns: ColumnDef<BookListingCard>[] = [
  {
    accessorKey: 'title',
    header: () => h('div', { class: 'text-left' }, 'Title'),
    cell: ({ row }) => {
      const title = row.getValue('title') as string

      return h('div', { class: 'text-left font-medium' }, title)
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => h('div', { class: 'text-left' }, 'Created At'),
    cell: ({ row }) => {
      const formattedDate = dayjs(row.getValue('createdAt')).format('DD/MM/YYYY')

      return h('div', { class: 'text-left font-medium' }, formattedDate)
    },
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'ID'),
    cell: ({ row }) => {
      const id = row.getValue('id') as string

      return h('div', { class: 'text-left font-medium' }, id)
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          book,
        }),
      )
    },
  },
]
