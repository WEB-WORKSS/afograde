// Local test endpoint for the contact form: VITE_LEAD_ENDPOINT=http://localhost:8787/lead npm run dev
// POST with company "FAIL" returns 500 to exercise the error state.
import http from "node:http";
http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") return res.end();
  let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => {
    const v = JSON.parse(b || "{}"); console.log("lead received:", v.email, v.company);
    res.statusCode = v.company === "FAIL" ? 500 : 200; res.end(JSON.stringify({ ok: res.statusCode === 200 }));
  });
}).listen(8787, () => console.log("lead dev endpoint on http://localhost:8787/lead"));
