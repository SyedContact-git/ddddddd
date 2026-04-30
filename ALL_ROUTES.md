# Complete API Routes Reference

> **Base URL:** Your deployed proxy URL (e.g. `https://your-app.vercel.app`)
>
> **Upstream:** `https://apiserverpro.vercel.app`
>
> **Auto-Cache:** All responses auto-refresh every 60 seconds

---

## Table of Contents

1. [PW (Physics Wallah) — 18 routes](#pw-physics-wallah)
2. [KGS (Khan Global Studies) — 3 routes](#kgs-khan-global-studies)
3. [Padhle — 6 routes](#padhle)
4. [ScienceAndFun — 5 routes](#scienceandfun)
5. [Vibrant Academy — 5 routes](#vibrant-academy)
6. [MissionJeet — 3 routes](#missionjeet)
7. [NextToppers — 4 routes](#nexttoppers)
8. [RWA (Rojgar With Ankit) — 2 routes](#rwa-rojgar-with-ankit)
9. [Cache Status — 1 route](#cache-status)
10. [Video Playback Guide](#video-playback-guide)

**Total: 47 platform routes + 1 cache status = 48 routes**

---

## PW (Physics Wallah)

### Batches & Course Structure

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 1 | `GET` | `/api/pw/batches` | — | List all PW batches | `{ data: [{ batchId, name, previewImage, byName, slug, ... }] }` |
| 2 | `POST` | `/api/pw/batchdetails` | Body: `{ "searchParams": { "BatchId": "<batchId>" } }` | Get batch details (subjects list) | `{ data: { subjects: [{ subjectId, subject, slug, icon, ... }] } }` |
| 3 | `GET` | `/api/pw/topics` | `?BatchId=<id>&SubjectId=<id>` | Get topics for a subject | `{ data: [{ _id, topic, slug, image, ... }] }` |
| 4 | `GET` | `/api/pw/datacontent` | `?batchId=<id>&subjectSlug=<slug>&topicSlug=<slug>` | Get content items (videos, notes, DPP) for a topic | `{ data: [{ _id, topic, type, videoDetails, ... }] }` |

### Video Playback

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 5 | `GET` | `/api/pw/video` | `?batchId=<id>&subjectId=<id>` | Get video list for a subject | `{ data: [...] }` |
| 6 | `GET` | `/api/pw/videoplay` | `?batchId=<id>&subjectId=<id>&childId=<id>` | Get video playback info (MPD URL, DRM keys) | `{ url, mpdUrl, keys, ... }` |
| 7 | `GET` | `/api/pw/videosuper` | `?batchId=<id>&childId=<id>` | Get super video details | `{ url, ... }` |
| 8 | `GET` | `/api/pw/get-url` | `?video_id=<id>&batch_id=<id>&subject_slug=<slug>` OR `?childId=<id>&batchId=<id>` | Get video stream URL | `{ url, name, title, videoUrl, ... }` |
| 9 | `GET` | `/api/pw/otp` | `?kid=<kid>` | Get OTP/decryption key for DRM video | `{ key, ... }` |
| 10 | `GET` | `/api/pw/kid` | `?mpdUrl=<encoded_url>` | Extract KID from MPD manifest | `{ kid, ... }` |

### Attachments & Downloads

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 11 | `GET` | `/api/pw/attachments-url` | `?BatchId=<id>&SubjectId=<id>&ContentId=<id>` | Get attachment (notes/DPP PDF) URLs | `{ data: [{ url, name, ... }] }` |
| 12 | `GET` | `/api/pw/attachment-link` | `?batchId=<id>` | Get attachment download link | `{ url, ... }` |
| 13 | `GET` | `/api/pw/download` | `?url=<encoded_url>` | Download/proxy a file URL | Binary file stream |
| 14 | `GET` | `/api/pw/view` | `?url=<encoded_url>` | View/proxy a file URL | Binary file stream |

### Live Classes & Announcements

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 15 | `POST` | `/api/pw/live` | Body: `{ "searchParams": { "BatchId": "<batchId>" } }` | Get live/upcoming classes for a batch | `{ data: [{ id, title, isLive, startTime, ... }] }` |
| 16 | `GET` | `/api/pw/announcement` | `?batchId=<id>` | Get batch announcements | `{ data: [...] }` |

### Auth (Login/OTP)

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 17 | `POST` | `/api/pw/login` | Body: `{ "phone": "<phone>", "username": "<name>" }` | Login to PW (sends OTP) | `{ success, ... }` |
| 18 | `POST` | `/api/pw/verify` | Body: `{ "otp": "<otp>", "phone": "<phone>", "username": "<name>" }` | Verify OTP login | `{ token, ... }` |

---

## KGS (Khan Global Studies)

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 1 | `GET` | `/api/kgs/batches` | — | List all KGS batches/courses | `{ batches: [{ id, name, image, subtitle, ... }] }` |
| 2 | `GET` | `/api/kgs/course-details` | `?id=<courseId>` | Get course details with subjects | `{ sub: [{ id, name, videos, notes, ... }] }` |
| 3 | `GET` | `/api/kgs/lessons` | `?id=<subjectId>` | Get lessons for a subject | `{ lessons: [{ id, name, video_url, hd_video_url, thumb, pdfs, ... }] }` |

---

## Padhle

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 1 | `GET` | `/api/padhle/batches` | — | List all Padhle courses | `{ data: [{ id, name, course_thumbnail, ... }] }` |
| 2 | `GET` | `/api/padhle/content` | `?course_id=<id>` or `?course_id=<id>&parent_id=<parentId>` | Get content tree (folders, videos, PDFs) | `{ data: [{ id, Title, material_type, videos_count, files_count, pdf_link, video_player_url, ... }] }` |
| 3 | `GET` | `/api/padhle/live` | `?course_id=<id>` | Get live & upcoming classes | `{ data: { live: [...], upcoming: [...] } }` |
| 4 | `GET` | `/api/padhle/previous-live` | `?course_id=<id>` | Get previous live class recordings | `{ data: [{ id, Title, video_player_url, event_date, ... }] }` |
| 5 | `GET` | `/api/padhle/video-details` | `?course_id=<id>&video_id=<id>` | Get video details and player URL | `{ data: { Title, video_player_url, video_player_token, pdf_link, pdf_encryption_key, duration, ... } }` |
| 6 | `GET` | `/api/padhle/play` | `?url=<encoded_url>` | Get actual playback URL | `{ url, data, ... }` |

---

## ScienceAndFun

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 1 | `GET` | `/api/scienceandfun/batches` | — | List all batches | `{ data: [{ id, name, course_thumbnail, ... }] }` |
| 2 | `GET` | `/api/scienceandfun/content` | `?course_id=<id>` or `?course_id=<id>&parent_id=<parentId>` | Get content tree | `{ data: [{ id, Title, material_type, videos_count, files_count, ... }] }` |
| 3 | `GET` | `/api/scienceandfun/live` | `?course_id=<id>` | Get live & upcoming classes | `{ data: { live: [...], upcoming: [...] } }` |
| 4 | `GET` | `/api/scienceandfun/previous-live` | `?course_id=<id>` | Get previous live recordings | `{ data: [...] }` |
| 5 | `GET` | `/api/scienceandfun/video-details` | `?course_id=<id>&video_id=<id>` | Get video details | `{ data: { Title, video_player_url, pdf_link, duration, ... } }` |

---

## Vibrant Academy

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 1 | `GET` | `/api/vibrant/content` | `?course_id=<id>` or `?course_id=<id>&parent_id=<parentId>` | Get content tree | `{ data: [{ id, Title, material_type, videos_count, files_count, ... }] }` |
| 2 | `GET` | `/api/vibrant/live` | `?course_id=<id>` | Get live & upcoming classes | `{ data: { live: [...], upcoming: [...] } }` |
| 3 | `GET` | `/api/vibrant/previous-live` | `?course_id=<id>` | Get previous live recordings | `{ data: [...] }` |
| 4 | `GET` | `/api/vibrant/video-details` | `?course_id=<id>&video_id=<id>` | Get video details | `{ data: { Title, video_player_url, pdf_link, duration, ... } }` |
| 5 | `GET` | `/api/vibrant/play` | `?url=<encoded_url>` | Get actual playback URL | `{ url, data, ... }` |

---

## MissionJeet

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 1 | `GET` | `/api/missionjeet/batches` | — | List all batches | `{ data: [{ id, name, image, ... }] }` |
| 2 | `GET` | `/api/missionjeet/live` | — | Get live & upcoming classes | `{ data: [{ id, title, is_live, file_url, thumbnail, ... }] }` |
| 3 | `GET` | `/api/missionjeet/course-details` | `?id=<courseId>` | Get course details | `{ data: { ... } }` |

---

## NextToppers

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 1 | `GET` | `/api/nexttoppers/batches` | — | List all batches | `{ data: [{ id, name, image, ... }] }` |
| 2 | `GET` | `/api/nexttoppers/live` | — | Get live & upcoming classes | `{ data: [{ id, title, is_live, file_url, ... }] }` |
| 3 | `GET` | `/api/nexttoppers/course-details` | `?id=<courseId>` | Get course details | `{ data: { ... } }` |
| 4 | `GET` | `/api/nexttoppers/getVideoDetailsDrm` | `?videoid=<videoId>` | Get DRM video playback details | `{ data: { title, file_url, is_drm, thumbnail, ... } }` |

---

## RWA (Rojgar With Ankit)

| # | Method | Endpoint | Query / Body | Description | Response Shape |
|---|--------|----------|-------------|-------------|----------------|
| 1 | `GET/POST` | `/api/rwa/batches` | — | List all RWA courses | `{ data: [{ id, name, course_thumbnail, ... }] }` |
| 2 | `GET` | `/api/rwa/subjects/:courseId` | URL param: `courseId` | Get subjects for a course | `{ data: [{ subjectid, subject_name, subject_logo, ... }] }` |

---

## Cache Status

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | `GET` | `/api/cache-status` | View cache statistics and active cached entries |

---

## Video Playback Guide

### PW (Physics Wallah) — DRM Protected

```
Step 1: GET /api/pw/batches
        → Pick a batch → get batchId

Step 2: POST /api/pw/batchdetails
        Body: { "searchParams": { "BatchId": "<batchId>" } }
        → Get subjects list → pick subjectId, slug

Step 3: GET /api/pw/topics?BatchId=<batchId>&SubjectId=<subjectId>
        → Get topics → pick topicSlug

Step 4: GET /api/pw/datacontent?batchId=<batchId>&subjectSlug=<slug>&topicSlug=<topicSlug>
        → Get video/notes/DPP items → pick a video childId

Step 5: GET /api/pw/get-url?childId=<childId>&batchId=<batchId>
        → Get video stream URL

Step 6 (DRM videos):
        GET /api/pw/videoplay?batchId=<batchId>&subjectId=<subjectId>&childId=<childId>
        → Get MPD URL

        GET /api/pw/kid?mpdUrl=<encodedMpdUrl>
        → Extract KID from MPD manifest

        GET /api/pw/otp?kid=<kid>
        → Get decryption key

Step 7: Play using Shaka Player with ClearKey DRM:
        player.configure({
          drm: {
            clearKeys: { "<kid>": "<key>" }
          }
        });
        player.load(mpdUrl);
```

### KGS — Direct Video URL

```
Step 1: GET /api/kgs/batches → pick course id
Step 2: GET /api/kgs/course-details?id=<courseId> → get subjects
Step 3: GET /api/kgs/lessons?id=<subjectId> → get lessons with video_url
Step 4: Play video_url directly (YouTube embed or direct video)
```

### Padhle / ScienceAndFun / Vibrant — Token-based

```
Step 1: GET /api/<platform>/batches → pick course id
Step 2: GET /api/<platform>/content?course_id=<id> → browse folders
Step 3: GET /api/<platform>/content?course_id=<id>&parent_id=<folderId> → deeper folders
Step 4: GET /api/<platform>/video-details?course_id=<id>&video_id=<videoId> → get video_player_url
Step 5: GET /api/<platform>/play?url=<encodedVideoPlayerUrl> → get actual playback URL
Step 6: Play the returned URL in an iframe or video player
```

### Live Classes

```
PW:              POST /api/pw/live { "searchParams": { "BatchId": "<batchId>" } }
Padhle:          GET  /api/padhle/live?course_id=<id>
                 GET  /api/padhle/previous-live?course_id=<id>
ScienceAndFun:   GET  /api/scienceandfun/live?course_id=<id>
                 GET  /api/scienceandfun/previous-live?course_id=<id>
Vibrant:         GET  /api/vibrant/live?course_id=<id>
                 GET  /api/vibrant/previous-live?course_id=<id>
MissionJeet:     GET  /api/missionjeet/live
NextToppers:     GET  /api/nexttoppers/live
```

### Attachments / PDFs

```
PW:    GET /api/pw/attachments-url?BatchId=<id>&SubjectId=<id>&ContentId=<id>
       GET /api/pw/attachment-link?batchId=<id>
       GET /api/pw/download?url=<encodedUrl>
       GET /api/pw/view?url=<encodedUrl>
```

---

## Quick Route Count Summary

| Platform | Routes | Batches | Content | Video | Live | Auth | Attachments |
|----------|--------|---------|---------|-------|------|------|-------------|
| PW | 18 | 2 | 2 | 6 | 2 | 2 | 4 |
| KGS | 3 | 1 | 1 | 1 | — | — | — |
| Padhle | 6 | 1 | 1 | 2 | 2 | — | — |
| ScienceAndFun | 5 | 1 | 1 | 1 | 2 | — | — |
| Vibrant | 5 | — | 1 | 2 | 2 | — | — |
| MissionJeet | 3 | 1 | — | — | 1 | — | — |
| NextToppers | 4 | 1 | — | 1 | 1 | — | — |
| RWA | 2 | 1 | 1 | — | — | — | — |
| **Total** | **47** | **8** | **7** | **13** | **10** | **2** | **4** |
