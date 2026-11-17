const API = "https://mhgnkgtudzpbbiowsprp.supabase.co/functions/v1/wholesale-ops";
const MCP_URL = API + "/mcp";

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function badge(system) {
  const k = String(system).toLowerCase().replace(/[^a-z]/g, "");
  return `<span class="badge b-${esc(k)}">${esc(system)}</span>`;
}
function badges(list) { return (list || []).map(badge).join(""); }
function when(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
async function api(path, opts = {}) {
  const res = await fetch(API + path, { ...opts, headers: { "content-type": "application/json", ...(opts.headers || {}) } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
  return body;
}
