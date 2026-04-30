# Build a Study Platform App (Like Physics Wallah)

> **Use this prompt with any AI coding assistant (Cursor, Devin, Claude, ChatGPT, etc.) to build a complete study platform app that uses the API proxy.**

---

## The Prompt

```
Build me a complete study platform web app using React + Vite + React Router.
The app should look and work like Physics Wallah (PW) — showing all batches,
subjects, topics, videos, notes, DPP, live classes, and announcements across
8 educational platforms.

## API Base URL
Use this as the API base: YOUR_DEPLOYED_URL (e.g. https://your-app.vercel.app)
All responses auto-refresh every 60 seconds.

## Tech Stack
- React 19 + Vite
- React Router v7 (BrowserRouter)
- Vanilla CSS (dark theme, mobile-first responsive)
- No UI library needed — custom cards, grids, tabs

## App Structure & Routes

/                                              → Home (platform grid)
/platform/:platformId                          → Platform page (batches list)
/platform/:platformId/batch/:batchId           → Batch page (subjects/content)
/platform/:platformId/batch/:batchId/content   → Content explorer (root)
/platform/:platformId/batch/:batchId/content/:parentId → Content subfolder
/platform/:platformId/batch/:batchId/video/:videoId    → Video player
/platform/:platformId/batch/:batchId/live      → Live classes for batch
/platform/:platformId/live                     → Live classes for platform

## Pages to Build

### 1. Home Page (/)
- Grid of 8 platform cards with icon, name, description, color bar
- Search bar to filter platforms
- Each card links to /platform/:platformId
- Platforms:
  - KGS (color: #FF6B35, icon: 📚) — has content, no live
  - Padhle (color: #4CAF50, icon: 📖) — has content + live
  - ScienceAndFun (color: #2196F3, icon: 🔬) — has content + live
  - Vibrant Academy (color: #9C27B0, icon: 🎓) — has content + live
  - MissionJeet (color: #FF9800, icon: 🎯) — has live, no content
  - NextToppers (color: #E91E63, icon: 🏆) — has live, no content
  - RWA (color: #00BCD4, icon: 💼) — has content, no live
  - PW (color: #673AB7, icon: ⚡) — has content + live

### 2. Platform Page (/platform/:platformId)
- Show platform name, icon, description
- "View Live Classes" button (if platform has live)
- Fetch and display batches as cards with image, name, subtitle
- Search bar to filter batches
- Each card links to /platform/:platformId/batch/:batchId

API calls per platform:
  - KGS:           GET /api/kgs/batches
  - Padhle:        GET /api/padhle/batches
  - ScienceAndFun: GET /api/scienceandfun/batches
  - Vibrant:       (no batches endpoint — go straight to content)
  - MissionJeet:   GET /api/missionjeet/batches
  - NextToppers:   GET /api/nexttoppers/batches
  - RWA:           POST /api/rwa/batches (or GET)
  - PW:            GET /api/pw/batches

Batch parsing (response varies per platform):
  - KGS: data.batches || data.data → { id, name, image, subtitle }
  - Padhle/ScienceAndFun/Vibrant: data.data → { id: course_id, name: Title||name, image: course_thumbnail }
  - MissionJeet/NextToppers: data.data → { id, name, image: thumbnail }
  - RWA: data.data → { id, name, image: course_thumbnail }
  - PW: data.data → { id: batchId||slug, name, image: previewImage, subtitle: byName }
  - NOTE: PW sometimes returns encrypted data (string with ":") — show "Encrypted" placeholder

### 3. Batch Page (/platform/:platformId/batch/:batchId)
- Breadcrumb navigation
- Tabs: "Content" and "Live Classes" (if platform supports live)
- Fetch subjects/content for the batch
- Display as card grid

API calls per platform:
  - KGS: GET /api/kgs/course-details?id=<batchId>
    → data.sub → [{ id, name, videos, notes }]
  - Padhle/ScienceAndFun/Vibrant: GET /api/<platform>/content?course_id=<batchId>
    → data.data → [{ id, Title, material_type, videos_count, files_count, tests_count }]
  - RWA: GET /api/rwa/subjects/<batchId>
    → data.data → [{ subjectid, subject_name, subject_logo }]
  - PW: POST /api/pw/batchdetails with body { "searchParams": { "BatchId": "<batchId>" } }
    → data.data.subjects → [{ subjectId, subject, slug, icon }]
  - MissionJeet/NextToppers: Show info message (content requires auth)

Subject cards should show:
  - Icon based on type (📁 folder, 🎬 video, 📄 PDF)
  - Name, video/notes/test counts if available
  - Click to navigate to content explorer

### 4. Content Explorer (/platform/:platformId/batch/:batchId/content/:parentId?)
- Breadcrumb: Platform > Batch > Content
- Hierarchical folder browser (recursive)
- Shows folders, videos, PDFs, links

API calls per platform:
  - KGS: GET /api/kgs/lessons?id=<parentId>
    → data.lessons → [{ id, name, video_url, hd_video_url, thumb, pdfs }]
  - Padhle/ScienceAndFun/Vibrant: GET /api/<platform>/content?course_id=<batchId>&parent_id=<parentId>
    → data.data → [{ id, Title, material_type (FOLDER/VIDEO/PDF), video_player_url, pdf_link, duration }]
  - PW: GET /api/pw/topics?BatchId=<batchId>&SubjectId=<parentId>
    → data.data → [{ _id, topic, slug }]
    Then for topic content:
    GET /api/pw/datacontent?batchId=<batchId>&subjectSlug=<slug>&topicSlug=<topicSlug>
    → data.data → items with video details

Item types and actions:
  - FOLDER → navigate deeper: /content/<itemId>
  - VIDEO → navigate to video player: /video/<itemId>
  - PDF → open pdf_link in new tab
  - LINK → open in new tab

### 5. Video Player (/platform/:platformId/batch/:batchId/video/:videoId)
- Breadcrumb: Platform > Batch > Video
- Full-width video player
- Video title, duration, metadata below
- PDF attachment download button if available

Video loading per platform:

  **Padhle:**
  1. GET /api/padhle/video-details?course_id=<batchId>&video_id=<videoId>
  2. Get video_player_url from response
  3. GET /api/padhle/play?url=<encodedVideoPlayerUrl> → get actual playback URL
  4. Play in iframe or video element

  **ScienceAndFun:**
  1. GET /api/scienceandfun/video-details?course_id=<batchId>&video_id=<videoId>
  2. GET /api/vibrant/play?url=<encodedVideoPlayerUrl> → playback URL
  3. Play in iframe/video

  **Vibrant:**
  1. GET /api/vibrant/video-details?course_id=<batchId>&video_id=<videoId>
  2. GET /api/vibrant/play?url=<encodedVideoPlayerUrl> → playback URL
  3. Play in iframe/video

  **KGS:**
  - Video URL comes from lessons response (video_url or hd_video_url)
  - If YouTube embed URL → use iframe
  - If direct video → use <video> element

  **NextToppers (DRM):**
  1. GET /api/nexttoppers/getVideoDetailsDrm?videoid=<videoId>
  2. Get file_url, is_drm, thumbnail
  3. Play file_url in video/iframe

  **PW (DRM — ClearKey):**
  1. GET /api/pw/get-url?childId=<videoId>&batchId=<batchId> → get URL
  2. If DRM needed:
     - GET /api/pw/videoplay?batchId=<batchId>&subjectId=<subjectId>&childId=<videoId> → MPD URL
     - GET /api/pw/kid?mpdUrl=<encodedMpdUrl> → extract KID
     - GET /api/pw/otp?kid=<kid> → get decryption key
     - Use Shaka Player with ClearKey: { clearKeys: { "<kid>": "<key>" } }
  3. Non-DRM: play URL directly

  **Player logic:**
  - YouTube embed URLs → <iframe src={embedUrl}>
  - .m3u8 / .mpd URLs → <video> or Shaka/HLS.js player
  - Other http URLs → <iframe> as fallback
  - Show error state if no URL available

### 6. Live Classes (/platform/:platformId/batch/:batchId/live OR /platform/:platformId/live)
- 3 tabs: "Live Now", "Upcoming", "Previous"
- Each class shows: thumbnail, title, date/time, live indicator

API calls per platform:

  **Padhle/ScienceAndFun/Vibrant (needs batchId):**
  - GET /api/<platform>/live?course_id=<batchId>
    → data.data = { live: [...], upcoming: [...] }
  - GET /api/<platform>/previous-live?course_id=<batchId>
    → data.data = [{ Title, video_player_url, event_date, ... }]

  **MissionJeet (no batchId needed):**
  - GET /api/missionjeet/live
    → data.data → filter by is_live (true=live, false=upcoming)

  **NextToppers (no batchId needed):**
  - GET /api/nexttoppers/live
    → data.data → filter by is_live

  **PW (needs batchId):**
  - POST /api/pw/live with body { "searchParams": { "BatchId": "<batchId>" } }
    → data.data → filter by isLive / is_live

  Parse each live item:
  {
    id, title: Title || title || name,
    isLive: is_live || isLive || live_status === 1,
    thumbnail, videoUrl: file_url || video_player_url || url,
    date: event_date || date || startTime,
    duration, pdfLink: pdf_link
  }

## Shared Components

### Layout
- Dark theme navbar with app title "Study Platform"
- Sticky top bar
- Main content area with padding

### Breadcrumb
- Clickable path: Home > Platform > Batch > Content/Video
- Each segment links to its page

### Loading
- Centered spinner with message

### ErrorState
- Error icon, message, retry button

### ImageWithFallback
- Show image, fall back to colored placeholder with first letter if image fails

## API Service (src/services/api.js)

Create a centralized API service:

const BASE = '' // same-origin proxy, or your deployed URL

async function get(path) {
  const res = await fetch(BASE + path)
  if (!res.ok) throw new Error('API error ' + res.status)
  return res.json()
}

async function post(path, body) {
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('API error ' + res.status)
  return res.json()
}

export const api = {
  kgs: {
    batches: () => get('/api/kgs/batches'),
    courseDetails: (id) => get('/api/kgs/course-details?id=' + id),
    lessons: (id) => get('/api/kgs/lessons?id=' + id),
  },
  padhle: {
    batches: () => get('/api/padhle/batches'),
    content: (courseId, parentId) => {
      let url = '/api/padhle/content?course_id=' + courseId
      if (parentId) url += '&parent_id=' + parentId
      return get(url)
    },
    live: (courseId) => get('/api/padhle/live?course_id=' + courseId),
    previousLive: (courseId) => get('/api/padhle/previous-live?course_id=' + courseId),
    videoDetails: (courseId, videoId) => get('/api/padhle/video-details?course_id=' + courseId + '&video_id=' + videoId),
    play: (url) => get('/api/padhle/play?url=' + encodeURIComponent(url)),
  },
  scienceandfun: {
    batches: () => get('/api/scienceandfun/batches'),
    content: (courseId, parentId) => {
      let url = '/api/scienceandfun/content?course_id=' + courseId
      if (parentId) url += '&parent_id=' + parentId
      return get(url)
    },
    live: (courseId) => get('/api/scienceandfun/live?course_id=' + courseId),
    previousLive: (courseId) => get('/api/scienceandfun/previous-live?course_id=' + courseId),
    videoDetails: (courseId, videoId) => get('/api/scienceandfun/video-details?course_id=' + courseId + '&video_id=' + videoId),
    play: (url) => get('/api/vibrant/play?url=' + encodeURIComponent(url)),
  },
  vibrant: {
    content: (courseId, parentId) => {
      let url = '/api/vibrant/content?course_id=' + courseId
      if (parentId) url += '&parent_id=' + parentId
      return get(url)
    },
    live: (courseId) => get('/api/vibrant/live?course_id=' + courseId),
    previousLive: (courseId) => get('/api/vibrant/previous-live?course_id=' + courseId),
    videoDetails: (courseId, videoId) => get('/api/vibrant/video-details?course_id=' + courseId + '&video_id=' + videoId),
    play: (url) => get('/api/vibrant/play?url=' + encodeURIComponent(url)),
  },
  missionjeet: {
    batches: () => get('/api/missionjeet/batches'),
    live: () => get('/api/missionjeet/live'),
    courseDetails: (id) => get('/api/missionjeet/course-details?id=' + id),
  },
  nexttoppers: {
    batches: () => get('/api/nexttoppers/batches'),
    live: () => get('/api/nexttoppers/live'),
    courseDetails: (id) => get('/api/nexttoppers/course-details?id=' + id),
    videoDrm: (videoId) => get('/api/nexttoppers/getVideoDetailsDrm?videoid=' + videoId),
  },
  rwa: {
    batches: () => post('/api/rwa/batches'),
    subjects: (courseId) => get('/api/rwa/subjects/' + courseId),
  },
  pw: {
    batches: () => get('/api/pw/batches'),
    batchDetails: (batchId) => post('/api/pw/batchdetails', { searchParams: { BatchId: batchId } }),
    live: (batchId) => post('/api/pw/live', { searchParams: { BatchId: batchId } }),
    topics: (batchId, subjectId) => get('/api/pw/topics?BatchId=' + batchId + '&SubjectId=' + subjectId),
    dataContent: (batchId, subjectSlug, topicSlug) =>
      get('/api/pw/datacontent?batchId=' + batchId + '&subjectSlug=' + subjectSlug + '&topicSlug=' + topicSlug),
    video: (batchId, subjectId) => get('/api/pw/video?batchId=' + batchId + '&subjectId=' + subjectId),
    videoPlay: (batchId, subjectId, childId) =>
      get('/api/pw/videoplay?batchId=' + batchId + '&subjectId=' + subjectId + '&childId=' + childId),
    getUrl: (params) => {
      const q = new URLSearchParams(params).toString()
      return get('/api/pw/get-url?' + q)
    },
    otp: (params) => {
      const q = new URLSearchParams(params).toString()
      return get('/api/pw/otp?' + q)
    },
    kid: (mpdUrl) => get('/api/pw/kid?mpdUrl=' + encodeURIComponent(mpdUrl)),
    attachments: (batchId, subjectId, contentId) =>
      get('/api/pw/attachments-url?BatchId=' + batchId + '&SubjectId=' + subjectId + '&ContentId=' + contentId),
    attachmentLink: (batchId) => get('/api/pw/attachment-link?batchId=' + batchId),
    download: (url) => get('/api/pw/download?url=' + encodeURIComponent(url)),
    view: (url) => get('/api/pw/view?url=' + encodeURIComponent(url)),
    announcement: (batchId) => get('/api/pw/announcement?batchId=' + batchId),
    login: (phone, username) => post('/api/pw/login', { phone, username }),
    verify: (otp, phone, username) => post('/api/pw/verify', { otp, phone, username }),
    videoSuper: (batchId, childId) => get('/api/pw/videosuper?batchId=' + batchId + '&childId=' + childId),
  },
}

## Platform Config

export const PLATFORMS = [
  { id: 'kgs', name: 'KGS', description: 'Khan Global Studies - UPSC & SSC preparation', color: '#FF6B35', icon: '📚', hasLive: false, hasContent: true },
  { id: 'padhle', name: 'Padhle', description: 'Complete learning platform with live classes', color: '#4CAF50', icon: '📖', hasLive: true, hasContent: true },
  { id: 'scienceandfun', name: 'Science And Fun', description: 'Science education made easy and fun', color: '#2196F3', icon: '🔬', hasLive: true, hasContent: true },
  { id: 'vibrant', name: 'Vibrant Academy', description: 'Premier coaching for competitive exams', color: '#9C27B0', icon: '🎓', hasLive: true, hasContent: true },
  { id: 'missionjeet', name: 'MissionJeet', description: 'Mission to ace your exams', color: '#FF9800', icon: '🎯', hasLive: true, hasContent: false },
  { id: 'nexttoppers', name: 'NextToppers', description: 'Next generation toppers platform', color: '#E91E63', icon: '🏆', hasLive: true, hasContent: false },
  { id: 'rwa', name: 'RWA (Rojgar With Ankit)', description: 'Government job preparation', color: '#00BCD4', icon: '💼', hasLive: false, hasContent: true },
  { id: 'pw', name: 'Physics Wallah (PW)', description: "India's most loved education platform", color: '#673AB7', icon: '⚡', hasLive: true, hasContent: true },
]

## CSS Theme (Dark Mode)

:root {
  --bg: #0f0f0f;
  --bg-card: #1a1a2e;
  --bg-hover: #16213e;
  --text: #e0e0e0;
  --text-secondary: #a0a0a0;
  --accent: #7c3aed;
  --accent-light: #a78bfa;
  --danger: #ef4444;
  --success: #22c55e;
  --border: #2a2a3e;
  --radius: 12px;
}

## Important Notes
- PW data is sometimes encrypted (string containing ":") — show placeholder
- All GET responses are cached 60s (auto-refreshing)
- POST responses also cached 60s (in-memory)
- Check X-Cache header to confirm caching
- CORS is enabled on all routes
- Handle errors gracefully — show ErrorState with retry button
- All 47 routes + 1 cache-status route must be used
- Make the app mobile-responsive
- Use loading states for all data fetching
```

---

## File Structure

```
src/
├── App.jsx              ← Routes
├── main.jsx             ← Entry point
├── services/
│   └── api.js           ← All API calls + PLATFORMS config
├── components/
│   ├── Layout.jsx       ← Navbar + wrapper
│   ├── Breadcrumb.jsx   ← Path navigation
│   ├── Loading.jsx      ← Spinner
│   ├── ErrorState.jsx   ← Error + retry
│   └── ImageWithFallback.jsx
├── pages/
│   ├── Home.jsx         ← Platform grid
│   ├── Platform.jsx     ← Batches list
│   ├── Batch.jsx        ← Subjects/content
│   ├── Content.jsx      ← Folder browser
│   ├── VideoPlayer.jsx  ← Video playback
│   └── LiveClasses.jsx  ← Live/upcoming/previous
└── styles/
    └── index.css        ← Global dark theme
```

## Every Route Used In The App

| API Route | Used In Page | Purpose |
|-----------|-------------|---------|
| `GET /api/pw/batches` | Platform.jsx | List PW batches |
| `POST /api/pw/batchdetails` | Batch.jsx | Get PW subjects |
| `POST /api/pw/live` | LiveClasses.jsx | PW live classes |
| `GET /api/pw/topics` | Content.jsx | PW topics list |
| `GET /api/pw/datacontent` | Content.jsx | PW topic content |
| `GET /api/pw/video` | Content.jsx | PW video list |
| `GET /api/pw/videoplay` | VideoPlayer.jsx | PW DRM video info |
| `GET /api/pw/videosuper` | VideoPlayer.jsx | PW video details |
| `GET /api/pw/get-url` | VideoPlayer.jsx | PW stream URL |
| `GET /api/pw/otp` | VideoPlayer.jsx | PW DRM key |
| `GET /api/pw/kid` | VideoPlayer.jsx | PW KID extraction |
| `GET /api/pw/attachments-url` | Content.jsx | PW attachments |
| `GET /api/pw/attachment-link` | Content.jsx | PW attachment link |
| `GET /api/pw/download` | Content.jsx | Download file |
| `GET /api/pw/view` | Content.jsx | View file |
| `GET /api/pw/announcement` | Batch.jsx | PW announcements |
| `POST /api/pw/login` | (Auth flow) | PW login |
| `POST /api/pw/verify` | (Auth flow) | PW verify OTP |
| `GET /api/kgs/batches` | Platform.jsx | KGS batches |
| `GET /api/kgs/course-details` | Batch.jsx | KGS course info |
| `GET /api/kgs/lessons` | Content.jsx | KGS lessons |
| `GET /api/padhle/batches` | Platform.jsx | Padhle batches |
| `GET /api/padhle/content` | Content.jsx | Padhle folders |
| `GET /api/padhle/live` | LiveClasses.jsx | Padhle live |
| `GET /api/padhle/previous-live` | LiveClasses.jsx | Padhle previous |
| `GET /api/padhle/video-details` | VideoPlayer.jsx | Padhle video info |
| `GET /api/padhle/play` | VideoPlayer.jsx | Padhle play URL |
| `GET /api/scienceandfun/batches` | Platform.jsx | SAF batches |
| `GET /api/scienceandfun/content` | Content.jsx | SAF folders |
| `GET /api/scienceandfun/live` | LiveClasses.jsx | SAF live |
| `GET /api/scienceandfun/previous-live` | LiveClasses.jsx | SAF previous |
| `GET /api/scienceandfun/video-details` | VideoPlayer.jsx | SAF video info |
| `GET /api/vibrant/content` | Content.jsx | Vibrant folders |
| `GET /api/vibrant/live` | LiveClasses.jsx | Vibrant live |
| `GET /api/vibrant/previous-live` | LiveClasses.jsx | Vibrant previous |
| `GET /api/vibrant/video-details` | VideoPlayer.jsx | Vibrant video info |
| `GET /api/vibrant/play` | VideoPlayer.jsx | Vibrant play URL |
| `GET /api/missionjeet/batches` | Platform.jsx | MJ batches |
| `GET /api/missionjeet/live` | LiveClasses.jsx | MJ live |
| `GET /api/missionjeet/course-details` | Batch.jsx | MJ course info |
| `GET /api/nexttoppers/batches` | Platform.jsx | NT batches |
| `GET /api/nexttoppers/live` | LiveClasses.jsx | NT live |
| `GET /api/nexttoppers/course-details` | Batch.jsx | NT course info |
| `GET /api/nexttoppers/getVideoDetailsDrm` | VideoPlayer.jsx | NT DRM video |
| `GET/POST /api/rwa/batches` | Platform.jsx | RWA batches |
| `GET /api/rwa/subjects/:courseId` | Batch.jsx | RWA subjects |
| `GET /api/cache-status` | (Debug/Admin) | Cache stats |
