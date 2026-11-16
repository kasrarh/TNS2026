/**
 * One-off runner for the multi-role dashboard indexes.
 * Index list matches src/lib/db/indexes.ts.
 *
 * Usage: node scripts/ensure-db-indexes.mjs
 */
import dns from "node:dns/promises";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient } from "mongodb";

const DB_NAME = "conference";

const PROFILE_COLLECTIONS = [
  "speaker_profiles",
  "team_profiles",
  "attendee_profiles",
];

function loadEnvFiles() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

  for (const name of [".env", ".env.local"]) {
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;

    const text = fs.readFileSync(file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

/**
 * Same SRV workaround as src/lib/mongodb.tsx: local DNS proxies often
 * refuse Node's querySrv, so resolve via public DNS first.
 */
async function resolveSrvUri(connectionUri) {
  if (!connectionUri.startsWith("mongodb+srv://")) {
    return connectionUri;
  }

  const parsed = new URL(connectionUri);
  const host = parsed.hostname;
  const resolver = new dns.Resolver();
  resolver.setServers(["8.8.8.8", "1.1.1.1"]);

  const [srvRecords, txtRecords] = await Promise.all([
    resolver.resolveSrv(`_mongodb._tcp.${host}`),
    resolver.resolveTxt(host),
  ]);

  if (!srvRecords.length) {
    throw new Error(`No SRV records found for ${host}`);
  }

  const seeds = srvRecords.map((record) => `${record.name}:${record.port || 27017}`).join(",");
  const txt = txtRecords.flat().join("&");
  const txtParams = new URLSearchParams(txt);
  const existing = new URLSearchParams(parsed.search);

  if (!existing.has("tls") && !existing.has("ssl")) {
    existing.set("tls", "true");
  }
  for (const [key, value] of txtParams.entries()) {
    if (!existing.has(key)) existing.set(key, value);
  }

  const auth =
    parsed.username || parsed.password
      ? `${decodeURIComponent(parsed.username)}:${decodeURIComponent(parsed.password)}@`
      : "";

  return `mongodb://${auth}${seeds}/?${existing.toString()}`;
}

async function ensureIndexes(db) {
  await db.collection("users").createIndexes([
    { key: { email: 1 }, unique: true, name: "users_email_unique" },
    { key: { role: 1, status: 1 }, name: "users_role_status" },
  ]);

  for (const name of PROFILE_COLLECTIONS) {
    await db.collection(name).createIndex(
      { userId: 1 },
      { unique: true, name: `${name}_userId_unique` }
    );
  }

  await db.collection("sessions").createIndexes([
    { key: { tokenHash: 1 }, unique: true, name: "sessions_tokenHash_unique" },
    {
      key: { expiresAt: 1 },
      expireAfterSeconds: 0,
      name: "sessions_expiresAt_ttl",
    },
  ]);
}

async function main() {
  loadEnvFiles();

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to .env.local.");
  }

  const resolvedUri = await resolveSrvUri(uri);
  const client = new MongoClient(resolvedUri);

  try {
    await client.connect();
    await ensureIndexes(client.db(DB_NAME));
    console.log(`Indexes ensured on ${DB_NAME}.`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
