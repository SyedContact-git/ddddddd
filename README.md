# Study API Proxy

Full proxy mirror of all educational platform API routes from [deltastudy.site](https://deltastudy.site/study-v2/batches). Supports **PW (Physics Wallah)**, **KGS**, **Padhle**, **Science And Fun**, **Vibrant Academy**, **MissionJeet**, **NextToppers**, and **RWA**.

All responses are returned as-is from the upstream API server with CORS headers enabled for cross-origin access.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SyedContact-git/ddddddd)

```bash
npm install
npm run build
npm start
```

## API Routes

### PW (Physics Wallah)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pw/batches` | List all PW batches |
| POST | `/api/pw/batchdetails` | Get batch details (body: `{ "searchParams": { "BatchId": "<id>" } }`) |
| POST | `/api/pw/live` | Get live classes (body: `{ "batchId": "<id>" }`) |
| GET | `/api/pw/topics?BatchId=<id>&SubjectId=<id>` | Get topics for a batch subject |
| GET | `/api/pw/datacontent?batchId=<id>&subjectSlug=<slug>&topicSlug=<slug>` | Get content (videos, notes, DPP) for a topic |
| GET | `/api/pw/video?batchId=<id>&subjectId=<id>` | Get video list |
| GET | `/api/pw/videoplay?batchId=<id>&subjectId=<id>&childId=<id>` | Get video playback info (MPD URL, keys) |
| GET | `/api/pw/videosuper?batchId=<id>&childId=<id>` | Get video super details |
| GET | `/api/pw/get-url?video_id=<id>&batch_id=<id>&subject_slug=<slug>` | Get video stream URL (alt: `?childId=<id>&batchId=<id>`) |
| GET | `/api/pw/otp?kid=<kid>` | Get OTP/key for DRM video |
| GET | `/api/pw/kid?mpdUrl=<url>` | Extract KID from MPD manifest |
| GET | `/api/pw/attachments-url?BatchId=<id>&SubjectId=<id>&ContentId=<id>` | Get notes/DPP PDF URLs |
| GET | `/api/pw/attachment-link?batchId=<id>` | Get attachment download link |
| GET | `/api/pw/download?url=<url>` | Download/proxy a file |
| GET | `/api/pw/view?url=<url>` | View/proxy a file |
| GET | `/api/pw/announcement?batchId=<id>` | Get batch announcements |
| POST | `/api/pw/login` | Login (body: `{ "phone": "...", "username": "..." }`) |
| POST | `/api/pw/verify` | Verify OTP (body: `{ "otp": "...", "phone": "...", "username": "..." }`) |

### How to Play PW Videos

1. `GET /api/pw/batches` — list batches
2. `POST /api/pw/batchdetails` — get subjects for a batch
3. `GET /api/pw/topics?BatchId=...&SubjectId=...` — get topics
4. `GET /api/pw/datacontent?batchId=...&subjectSlug=...&topicSlug=...` — get videos/notes/DPP
5. `GET /api/pw/videoplay?batchId=...&subjectId=...&childId=...` — get MPD URL + DRM info
6. `GET /api/pw/kid?mpdUrl=...` — extract KID from MPD
7. `GET /api/pw/otp?kid=...` — get decryption key
8. Use **Shaka Player** with ClearKey DRM using the KID:KEY pair

### KGS (Khan Global Studies)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/kgs/batches` | List all KGS batches |
| GET | `/api/kgs/course-details?id=<id>` | Get course details |
| GET | `/api/kgs/lessons?id=<id>` | Get course lessons |

### Padhle

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/padhle/batches` | List all Padhle batches |
| GET | `/api/padhle/content?course_id=<id>&parent_id=<id>` | Get course content |
| GET | `/api/padhle/live?course_id=<id>` | Get live classes |
| GET | `/api/padhle/previous-live?course_id=<id>` | Get previous live classes |
| GET | `/api/padhle/video-details?course_id=<id>&video_id=<id>` | Get video details |
| GET | `/api/padhle/play?url=<url>` | Get playback URL |

### Science And Fun

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/scienceandfun/batches` | List all batches |
| GET | `/api/scienceandfun/content?course_id=<id>&parent_id=<id>` | Get course content |
| GET | `/api/scienceandfun/live?course_id=<id>` | Get live classes |
| GET | `/api/scienceandfun/previous-live?course_id=<id>` | Get previous live classes |
| GET | `/api/scienceandfun/video-details?course_id=<id>&video_id=<id>` | Get video details |

### Vibrant Academy

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vibrant/content?course_id=<id>&parent_id=<id>` | Get course content |
| GET | `/api/vibrant/live?course_id=<id>` | Get live classes |
| GET | `/api/vibrant/previous-live?course_id=<id>` | Get previous live classes |
| GET | `/api/vibrant/video-details?course_id=<id>&video_id=<id>` | Get video details |
| GET | `/api/vibrant/play?url=<url>` | Get playback URL |

### MissionJeet

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/missionjeet/batches` | List all batches |
| GET | `/api/missionjeet/live` | Get live classes |
| GET | `/api/missionjeet/course-details?id=<id>` | Get course details |

### NextToppers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/nexttoppers/batches` | List all batches |
| GET | `/api/nexttoppers/live` | Get live classes |
| GET | `/api/nexttoppers/course-details?id=<id>` | Get course details |
| GET | `/api/nexttoppers/getVideoDetailsDrm?videoid=<id>` | Get DRM video details |

### RWA (Rojgar With Ankit)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/rwa/batches` | List all RWA batches |
| GET | `/api/rwa/subjects/:courseId` | Get subjects for a course |

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Vercel** deployment ready
