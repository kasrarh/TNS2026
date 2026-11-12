import dns from "node:dns/promises";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

declare global {
  // Allow global variable reuse across hot reloads in dev
  // (Prevents creating new connections every time)
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Local DNS proxies (Laragon/VPN on 127.0.0.1) often refuse Node's querySrv
 * used by mongodb+srv. Resolve SRV/TXT via public DNS and rewrite to a
 * standard mongodb:// seed list so the driver never calls querySrv.
 */
async function resolveSrvUri(connectionUri: string): Promise<string> {
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

  const seeds = srvRecords
    .map((r) => `${r.name}:${r.port || 27017}`)
    .join(",");

  const txt = txtRecords.flat().join("&");
  const txtParams = new URLSearchParams(txt);
  const existing = new URLSearchParams(parsed.search);

  // Atlas SRV implies TLS; preserve app params and TXT defaults.
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

function createClientPromise(): Promise<MongoClient> {
  return resolveSrvUri(uri).then((resolvedUri) => {
    client = new MongoClient(resolvedUri, options);
    return client.connect();
  });
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export default clientPromise;
