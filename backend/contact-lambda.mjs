// Optional contact-form handler for AWS Lambda (Function URL) + Amazon SES. Not deployed yet.
// Env: TO_EMAIL=orevaoghene@afograde.com, FROM_EMAIL=<verified SES sender>, ALLOWED_ORIGIN=https://www.afograde.com
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
const ses = new SESv2Client({});
const ok = (code, body) => ({ statusCode: code, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "https://www.afograde.com", "Access-Control-Allow-Headers": "content-type" }, body: JSON.stringify(body) });
export const handler = async (event) => {
  if (event.requestContext?.http?.method === "OPTIONS") return ok(204, {});
  let v; try { v = JSON.parse(event.body || "{}"); } catch { return ok(400, { error: "Invalid JSON" }); }
  if (v.website) return ok(200, { ok: true });
  if (!v.name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email || "") || !v.consent) return ok(422, { error: "Missing required fields" });
  const text = ["name", "email", "company", "role", "size", "useCase", "plan", "message"].map((k) => `${k}: ${String(v[k] ?? "").slice(0, 1000)}`).join("\n");
  await ses.send(new SendEmailCommand({ FromEmailAddress: process.env.FROM_EMAIL, Destination: { ToAddresses: [process.env.TO_EMAIL] }, ReplyToAddresses: [v.email], Content: { Simple: { Subject: { Data: `Afograde early access: ${String(v.company).slice(0, 80)}` }, Body: { Text: { Data: text } } } } }));
  return ok(200, { ok: true });
};
