'use client'

import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'
import { useState } from 'react'
export default function Dashboard() {
const [refreshKey, setRefreshKey] = useState(0)
  return (
    <div className="max-w-2xl mx-2 md:mx-auto mt-10">
       <BookmarkForm onAdded={() => setRefreshKey(prev => prev + 1)} />
      <BookmarkList refreshKey={refreshKey} />
    </div>
   
  )
}
