import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

class RedisCache {
  private client: RedisClient;
  private connected = false;

  private readonly OneDay: number = 86400;
  private readonly FiveMinutes: number = 300;
  private readonly OneMinute: number = 60;

  constructor() {
    if (!this.connected) {
      this.client = new Redis(cacheConfig.config.redis);
      this.connected = true;
    }
  }

  public async save(key: string, value: unknown, seconds: number = this.OneDay): Promise<void> {
    await this.client.setex(key, seconds, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | undefined> {
    const data = await this.client.get(key);

    if (!data) {
      return undefined;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default new RedisCache();
