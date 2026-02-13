# Smart Bookmark App
vercel live url: https://smart-bookmark-app-livid.vercel.app/
## Features
- Google OAuth login
- Private bookmarks per user
- Real-time updates across tabs
- Delete bookmarks
- Deployed on Vercel

## Tech Stack
- Next.js App Router
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- 
## Problems Faced
1. OAuth redirect mismatch  (Fixed by adding correct callback URL)
2. Realtime not triggering ( Enabled Postgres changes in Supabase)
3. Users seeing others data ( Solved using RLS policies)

### Running on localhoast
-clone github repository
-install next
- run app using command npm run dev
- it will run on localhost:3000
