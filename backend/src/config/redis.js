import Redis from 'ioredis';

let redis;
export function getRedis() {
  if (!process.env.REDIS_URL) return null;
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 1, lazyConnect: true });
    redis.on('error', () => {}); // Cache failures must not break reward persistence.
  }
  return redis;
}

export async function cacheJson(key, value, ttlSeconds) {
  const client = getRedis();
  if (!client || ttlSeconds <= 0) return;
  try { await client.set(key, JSON.stringify(value), 'EX', ttlSeconds); } catch { /* cache is optional */ }
}
