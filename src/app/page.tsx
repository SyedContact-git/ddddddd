const routes = {
  pw: {
    title: "Physics Wallah (PW)",
    endpoints: [
      { method: "GET", path: "/api/pw/batches", desc: "List all PW batches" },
      { method: "POST", path: "/api/pw/batchdetails", desc: "Get batch details", body: '{ "searchParams": { "BatchId": "<id>" } }' },
      { method: "POST", path: "/api/pw/live", desc: "Get live classes for a batch", body: '{ "batchId": "<id>" }' },
      { method: "GET", path: "/api/pw/topics?BatchId=<id>&SubjectId=<id>", desc: "Get topics for a batch subject" },
      { method: "GET", path: "/api/pw/datacontent?batchId=<id>&subjectSlug=<slug>&topicSlug=<slug>", desc: "Get content (videos, notes, DPP) for a topic" },
      { method: "GET", path: "/api/pw/video?batchId=<id>&subjectId=<id>", desc: "Get video list" },
      { method: "GET", path: "/api/pw/videoplay?batchId=<id>&subjectId=<id>&childId=<id>", desc: "Get video playback info (MPD URL, keys)" },
      { method: "GET", path: "/api/pw/videosuper?batchId=<id>&childId=<id>", desc: "Get video super details" },
      { method: "GET", path: "/api/pw/get-url?video_id=<id>&batch_id=<id>&subject_slug=<slug> OR ?childId=<id>&batchId=<id>", desc: "Get video stream URL" },
      { method: "GET", path: "/api/pw/otp?kid=<kid>", desc: "Get OTP for DRM video key" },
      { method: "GET", path: "/api/pw/kid?mpdUrl=<encoded_url>", desc: "Get KID from MPD manifest" },
      { method: "GET", path: "/api/pw/attachments-url?BatchId=<id>&SubjectId=<id>&ContentId=<id>", desc: "Get attachment (notes/DPP PDF) URLs" },
      { method: "GET", path: "/api/pw/attachment-link?batchId=<id>", desc: "Get attachment download link" },
      { method: "GET", path: "/api/pw/download?url=<encoded_url>", desc: "Download/proxy a file URL" },
      { method: "GET", path: "/api/pw/view?url=<encoded_url>", desc: "View/proxy a file URL" },
      { method: "GET", path: "/api/pw/announcement?batchId=<id>", desc: "Get batch announcements" },
      { method: "POST", path: "/api/pw/login", desc: "Login to PW", body: '{ "phone": "<phone>", "username": "<name>" }' },
      { method: "POST", path: "/api/pw/verify", desc: "Verify OTP login", body: '{ "otp": "<otp>", "phone": "<phone>", "username": "<name>" }' },
    ],
  },
  kgs: {
    title: "KGS (Khan Global Studies)",
    endpoints: [
      { method: "GET", path: "/api/kgs/batches", desc: "List all KGS batches" },
      { method: "GET", path: "/api/kgs/course-details?id=<id>", desc: "Get course details" },
      { method: "GET", path: "/api/kgs/lessons?id=<id>", desc: "Get course lessons" },
    ],
  },
  padhle: {
    title: "Padhle",
    endpoints: [
      { method: "GET", path: "/api/padhle/batches", desc: "List all Padhle batches" },
      { method: "GET", path: "/api/padhle/content?course_id=<id>&parent_id=<id>", desc: "Get course content (folders/videos)" },
      { method: "GET", path: "/api/padhle/live?course_id=<id>", desc: "Get live classes" },
      { method: "GET", path: "/api/padhle/previous-live?course_id=<id>", desc: "Get previous live classes" },
      { method: "GET", path: "/api/padhle/video-details?course_id=<id>&video_id=<id>", desc: "Get video details" },
      { method: "GET", path: "/api/padhle/play?url=<encoded_url>", desc: "Get playback URL" },
    ],
  },
  scienceandfun: {
    title: "Science And Fun",
    endpoints: [
      { method: "GET", path: "/api/scienceandfun/batches", desc: "List all batches" },
      { method: "GET", path: "/api/scienceandfun/content?course_id=<id>&parent_id=<id>", desc: "Get course content" },
      { method: "GET", path: "/api/scienceandfun/live?course_id=<id>", desc: "Get live classes" },
      { method: "GET", path: "/api/scienceandfun/previous-live?course_id=<id>", desc: "Get previous live classes" },
      { method: "GET", path: "/api/scienceandfun/video-details?course_id=<id>&video_id=<id>", desc: "Get video details" },
    ],
  },
  vibrant: {
    title: "Vibrant Academy",
    endpoints: [
      { method: "GET", path: "/api/vibrant/content?course_id=<id>&parent_id=<id>", desc: "Get course content" },
      { method: "GET", path: "/api/vibrant/live?course_id=<id>", desc: "Get live classes" },
      { method: "GET", path: "/api/vibrant/previous-live?course_id=<id>", desc: "Get previous live classes" },
      { method: "GET", path: "/api/vibrant/video-details?course_id=<id>&video_id=<id>", desc: "Get video details" },
      { method: "GET", path: "/api/vibrant/play?url=<encoded_url>", desc: "Get playback URL" },
    ],
  },
  missionjeet: {
    title: "MissionJeet",
    endpoints: [
      { method: "GET", path: "/api/missionjeet/batches", desc: "List all batches" },
      { method: "GET", path: "/api/missionjeet/live", desc: "Get live classes" },
      { method: "GET", path: "/api/missionjeet/course-details?id=<id>", desc: "Get course details" },
    ],
  },
  nexttoppers: {
    title: "NextToppers",
    endpoints: [
      { method: "GET", path: "/api/nexttoppers/batches", desc: "List all batches" },
      { method: "GET", path: "/api/nexttoppers/live", desc: "Get live classes" },
      { method: "GET", path: "/api/nexttoppers/course-details?id=<id>", desc: "Get course details" },
      { method: "GET", path: "/api/nexttoppers/getVideoDetailsDrm?videoid=<id>", desc: "Get DRM video details" },
    ],
  },
  rwa: {
    title: "RWA (Rojgar With Ankit)",
    endpoints: [
      { method: "GET/POST", path: "/api/rwa/batches", desc: "List all RWA batches" },
      { method: "GET", path: "/api/rwa/subjects/:courseId", desc: "Get subjects for a course" },
    ],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tight">Study API Proxy</h1>
        <p className="mt-2 text-gray-400">
          Full proxy mirror of all educational platform API routes. All
          responses are cached and <strong className="text-emerald-400">auto-updated every 60 seconds</strong> from
          the upstream server with CORS headers enabled.
        </p>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10 space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-indigo-400 mb-2">
            Auto-Update Cache
          </h2>
          <div className="rounded-lg bg-gray-900 border border-gray-800 p-5 text-sm leading-relaxed space-y-2">
            <p>
              All API responses are automatically cached and refreshed every{" "}
              <strong className="text-emerald-400">60 seconds</strong>.
            </p>
            <p>
              <strong>GET routes:</strong> Use Next.js Data Cache with{" "}
              <code className="text-emerald-400">revalidate: 60</code>. First
              request fetches from upstream, subsequent requests serve cached
              data. After 60s the cache auto-refreshes in the background.
            </p>
            <p>
              <strong>POST routes:</strong> Use in-memory cache with 60s TTL.
              Same request body returns cached response within the TTL window.
            </p>
            <p>
              Check cache status:{" "}
              <code className="text-emerald-400">/api/cache-status</code>
            </p>
            <p>
              Response headers include{" "}
              <code className="text-emerald-400">X-Cache</code> (HIT/MISS/REVALIDATE)
              and{" "}
              <code className="text-emerald-400">X-Cache-Age</code> (seconds since cached).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-indigo-400 mb-2">
            How to Play PW Videos
          </h2>
          <div className="rounded-lg bg-gray-900 border border-gray-800 p-5 text-sm leading-relaxed space-y-2">
            <p>
              1. Call{" "}
              <code className="text-emerald-400">/api/pw/batches</code> to list
              batches.
            </p>
            <p>
              2. Call{" "}
              <code className="text-emerald-400">
                /api/pw/batchdetails
              </code>{" "}
              (POST) with the batch ID to get subjects.
            </p>
            <p>
              3. Call{" "}
              <code className="text-emerald-400">
                /api/pw/topics?BatchId=...&SubjectId=...
              </code>{" "}
              to get topics.
            </p>
            <p>
              4. Call{" "}
              <code className="text-emerald-400">
                /api/pw/datacontent?batchId=...&subjectSlug=...&topicSlug=...
              </code>{" "}
              to get videos/notes/DPP for a topic.
            </p>
            <p>
              5. Call{" "}
              <code className="text-emerald-400">
                /api/pw/videoplay?batchId=...&subjectId=...&childId=...
              </code>{" "}
              to get the MPD stream URL and DRM keys.
            </p>
            <p>
              6. Parse the MPD URL, call{" "}
              <code className="text-emerald-400">
                /api/pw/kid?mpdUrl=...
              </code>{" "}
              to extract the KID, then call{" "}
              <code className="text-emerald-400">/api/pw/otp?kid=...</code> to
              get the decryption key.
            </p>
            <p>
              7. Use a DASH player (like Shaka Player) with ClearKey DRM using
              the KID:KEY pair.
            </p>
          </div>
        </section>

        {Object.entries(routes).map(([key, platform]) => (
          <section key={key}>
            <h2 className="text-xl font-semibold text-indigo-400 mb-4">
              {platform.title}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-800">
              <table className="w-full text-sm">
                <thead className="bg-gray-900 text-gray-400">
                  <tr>
                    <th className="px-4 py-2 text-left w-24">Method</th>
                    <th className="px-4 py-2 text-left">Endpoint</th>
                    <th className="px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {platform.endpoints.map((ep, i) => (
                    <tr key={i} className="hover:bg-gray-900/50">
                      <td className="px-4 py-2">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${
                            ep.method === "GET"
                              ? "bg-emerald-900 text-emerald-300"
                              : ep.method === "POST"
                              ? "bg-blue-900 text-blue-300"
                              : "bg-yellow-900 text-yellow-300"
                          }`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-mono text-xs text-gray-300 break-all">
                        {ep.path}
                      </td>
                      <td className="px-4 py-2 text-gray-400">{ep.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </main>

      <footer className="border-t border-gray-800 px-6 py-6 text-center text-sm text-gray-500">
        All data is proxied and auto-cached (60s refresh) from upstream APIs.
        This server adds CORS headers for cross-origin access.
      </footer>
    </div>
  );
}
