'use client'

import { useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { UserContext } from '@/context/UserContext'

export default function BookmarkList({ refreshKey }: { refreshKey: number }) {
    const { user, loading } = useContext(UserContext)
    const [bookmarks, setBookmarks] = useState<any[]>([])



    useEffect(() => {
        if (loading) return
        if (!user) return

        const fetchBookmarks = async () => {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            console.log('Fetched bookmarks:', data, error)
            setBookmarks(data || [])
        }

        fetchBookmarks()

        const channel = supabase
            .channel('bookmarks-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${user.id}`,
                },
                fetchBookmarks
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user, loading,refreshKey])


    const deleteBookmark = async (id: string) => {
        setBookmarks(prev => prev.filter(b => b.id !== id))
        await supabase.from('bookmarks').delete().eq('id', id)
    }

    return (
        <div className="space-y-3">
            <h1 className='text-blue-500 font-bold text-lg'>BookMarks List</h1>
            {bookmarks.length==0 && <p className='text-black'>No bookmarks are added...</p>}
            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="bg-white p-4 rounded shadow flex justify-between"
                >
                    <div>
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-blue-600"
                        >
                            {bookmark.title}
                        </a>
                        <p className="text-sm text-gray-500">{bookmark.url}</p>
                    </div>

                    <button
                        onClick={() => deleteBookmark(bookmark.id)}
                        className="text-red-500"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}
