'use client'

import { useState, useContext } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { UserContext } from '@/context/UserContext'

export default function BookmarkForm({ onAdded }: { onAdded: () => void }) {
  const { user, loading } = useContext(UserContext)

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [saving, setSaving] = useState(false)

  if (loading) return null
  if (!user) return null

  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id,
    })

    if (!error) {
      setTitle('')
      setUrl('')
      onAdded() 
    }

    setSaving(false)
  }

  return (
    <form onSubmit={addBookmark} className="mb-6 space-y-3">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="url"
        placeholder="URL"
        className="w-full p-2 border rounded"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <button
        disabled={saving}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {saving ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  )
}
