import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from "cache-manager";

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async get(key) {
    // const result = await this.cache.get(key);
    // await this.cache.
    // console.debug(result)
    return await this.cache.get(key, {parse: false});
  }

  async set(key, value) {
    await this.cache.set(key, value);
  }
}